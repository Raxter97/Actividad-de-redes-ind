import { useState } from 'react';

// Conversión de IP a número entero para iterar sobre el rango
function ipToLong(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function longToIp(long) {
    return [24, 16, 8, 0].map(shift => (long >>> shift) & 255).join('.');
}

function App() {
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [timeoutMs, setTimeoutMs] = useState(1000);
    const [resultados, setResultados] = useState([]);
    const [escaneando, setEscaneando] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [totalActivos, setTotalActivos] = useState(0);

    const [filtro, setFiltro] = useState('');
    const [criterioOrden, setCriterioOrden] = useState('ip');

    // Expresión regular para validar formato IPv4
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // Validación en tiempo real al tipear
    const inicioValido = inicio === '' || ipRegex.test(inicio);
    const finValida = fin === '' || ipRegex.test(fin);

    const iniciarEscaneo = async () => {
        if (!ipRegex.test(inicio) || !ipRegex.test(fin)) return;

        const startLong = ipToLong(inicio);
        const endLong = ipToLong(fin);

        if (startLong > endLong) {
            alert('La IP de inicio debe ser menor o igual a la IP de fin');
            return;
        }

        setEscaneando(true);
        setResultados([]);
        setProgreso(0);
        setTotalActivos(0);

        const totalIps = endLong - startLong + 1;
        let activosActuales = 0;

        for (let i = 0; i < totalIps; i++) {
            const ipActual = longToIp(startLong + i);
            try {
                const res = await fetch(`http://localhost:3000/api/scan?ip=${ipActual}&timeout=${timeoutMs}`);
                const data = await res.json();
                
                setResultados(prev => [...prev, data]);
                if (data.activo) activosActuales++;
                setTotalActivos(activosActuales);
            } catch (error) {
                console.error('Error al realizar fetch:', error);
            }
            setProgreso(((i + 1) / totalIps) * 100);
        }
        setEscaneando(false);
    };

    const guardarResultados = () => {
        const cabecera = 'IP,Nombre,Estado,Tiempo\n';
        const filas = resultados.map(r => `${r.ip},${r.nombre},${r.activo ? 'Conectado' : 'Desconectado'},${r.tiempo}`).join('\n');
        const blob = new Blob([cabecera + filas], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resultados_red.csv';
        a.click();
    };

    // Filtrado de la tabla en tiempo real
    const resultadosFiltrados = resultados.filter(r => 
        r.ip.includes(filtro) || 
        r.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        (r.activo ? 'conectado' : 'desconectado').includes(filtro.toLowerCase())
    );

    // Ordenamiento dinámico de datos
    const resultadosOrdenados = [...resultadosFiltrados].sort((a, b) => {
        if (criterioOrden === 'ip') return ipToLong(a.ip) - ipToLong(b.ip);
        if (criterioOrden === 'nombre') return a.nombre.localeCompare(b.nombre);
        if (criterioOrden === 'estado') return (b.activo ? 1 : 0) - (a.activo ? 1 : 0);
        return 0;
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Escáner de Red</h2>
            
            <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                    <input 
                        placeholder="IP Inicio (ej. 192.168.1.1)" 
                        value={inicio} 
                        onChange={e => setInicio(e.target.value)} 
                        disabled={escaneando} 
                        style={{ borderColor: inicioValido ? '#ccc' : 'red', padding: '6px', width: '220px' }}
                    />
                    {!inicioValido && <span style={{ color: 'red', marginLeft: '8px', fontSize: '12px' }}>IP inválida</span>}
                </div>

                <div>
                    <input 
                        placeholder="IP Fin (ej. 192.168.1.10)" 
                        value={fin} 
                        onChange={e => setFin(e.target.value)} 
                        disabled={escaneando} 
                        style={{ borderColor: finValida ? '#ccc' : 'red', padding: '6px', width: '220px' }}
                    />
                    {!finValida && <span style={{ color: 'red', marginLeft: '8px', fontSize: '12px' }}>IP inválida</span>}
                </div>

                <div>
                    <input 
                        type="number" 
                        placeholder="Timeout (ms)" 
                        value={timeoutMs} 
                        onChange={e => setTimeoutMs(e.target.value)} 
                        disabled={escaneando} 
                        style={{ padding: '6px', width: '220px' }}
                    />
                </div>
            </div>
            
            <div style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
                <button 
                    onClick={iniciarEscaneo} 
                    disabled={escaneando || !inicioValido || !finValida || !inicio || !fin}
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                >
                    Comenzar
                </button>
                <button 
                    onClick={() => setResultados([])} 
                    disabled={escaneando} 
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                >
                    Limpiar
                </button>
                <button 
                    onClick={guardarResultados} 
                    disabled={resultados.length === 0} 
                    style={{ padding: '8px 16px', cursor: 'pointer' }}
                >
                    Guardar CSV
                </button>
            </div>
            
            {/* Barra de progreso */}
            <div style={{ width: '100%', border: '1px solid #ccc', height: '20px', marginBottom: '10px', backgroundColor: '#f0f0f0' }}>
                <div style={{ width: `${progreso}%`, background: '#4caf50', height: '100%', transition: 'width 0.2s' }}></div>
            </div>
            
            <p><strong>Equipos activos que respondieron:</strong> {totalActivos}</p>

            {/* Opciones para filtrar y ordenar */}
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                <input 
                    placeholder="Filtrar por IP, Nombre o Estado..." 
                    value={filtro} 
                    onChange={e => setFiltro(e.target.value)} 
                    style={{ padding: '6px', flex: 1 }}
                />
                <select value={criterioOrden} onChange={e => setCriterioOrden(e.target.value)} style={{ padding: '6px' }}>
                    <option value="ip">Ordenar por IP</option>
                    <option value="nombre">Ordenar por Nombre</option>
                    <option value="estado">Ordenar por Estado</option>
                </select>
            </div>
            
            {/* Tabla de resultados */}
            <table border="1" cellPadding="8" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Dirección IP</th>
                        <th>Nombre del Equipo</th>
                        <th>Estado</th>
                        <th>Tiempo de Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    {resultadosOrdenados.map((r, i) => (
                        <tr key={i} style={{ backgroundColor: r.activo ? '#f7f9f7' : '#4b0e17' }}>
                            <td>{r.ip}</td>
                            <td>{r.nombre}</td>
                            <td>{r.activo ? 'Conectado' : 'Desconectado'}</td>
                            <td>{r.tiempo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;