import { useEffect, useState } from 'react';
import api from '../api/api';
import CadastroTarefa from './CadastroTarefa';

const ListaTarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const carregarTarefas = () => {
        api.get('/tarefas/').then(res => {
            console.log(res)
            setTarefas(res.data);
        });
    };

    useEffect(() => {
        carregarTarefas();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tarefas/${id}/`);
            setTarefas(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    };

    return (
        <div>
            <button
                className="btn btn-success mb-3"
                onClick={() => setMostrarFormulario(prev => !prev)}
            >
                {mostrarFormulario ? 'Fechar Formulário' : 'Nova Tarefa'}
            </button>

            {mostrarFormulario && (
                <CadastroTarefa onTarefaCadastrada={carregarTarefas} />
            )}

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa, index) => (
                        <tr key={tarefa.id}>
                            <th scope="row">{index+1}</th>
                            <td>{tarefa.nome}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.status}</td>
                            <td>
                                <button type="button" className="btn">
                                    <i className="bi bi-pencil-square text-primary"></i>
                                </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => handleDelete(tarefa.id)}
                                >
                                    <i className="bi bi-trash text-danger"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaTarefas;
