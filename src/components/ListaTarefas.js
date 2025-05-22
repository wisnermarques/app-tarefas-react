import { useEffect, useState } from 'react';
import CadastroTarefa from './CadastroTarefa';
import supabase from '../api/supabase';

const ListaTarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [tarefaAtualizada, setTarefaAtualizada] = useState({ nome: '', descricao: '', status: '', dataInicio: '', dataFim: '' });

    const carregarTarefas = async () => {
        const { data, error } = await supabase
            .from('tarefas')
            .select('*');

        if (error) {
            console.error('Erro ao carregar tarefas:', error.message);
            return;
        }

        setTarefas(data);
    };

    useEffect(() => {
        carregarTarefas();
    }, []);

    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from('tarefas')         // nome da sua tabela
                .delete()
                .eq('id', id);           // campo 'id' igual ao passado

            if (error) {
                throw error;
            }

            setTarefas(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error.message || error);
        }
    };

    const handleEditClick = (tarefa) => {
        setTarefaEditando(tarefa.id);
        setTarefaAtualizada({
            nome: tarefa.nome,
            descricao: tarefa.descricao,
            status: tarefa.status,
            data_inicio: tarefa.dataInicio,
            data_fim: tarefa.dataFim,
        });
    };

    const handleSave = async (id, tarefaAtualizada) => {
        try {
            const { error } = await supabase
                .from('tarefas')           // nome da tabela no Supabase
                .update(tarefaAtualizada)  // objeto com os campos a atualizar
                .eq('id', id);             // identifica a tarefa pelo id

            if (error) {
                throw error;
            }

            setTarefaEditando(null);
            carregarTarefas();
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error.message || error);
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
                        <th scope="col">Data Início</th>
                        <th scope="col">Data Fim</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map((tarefa, index) => (
                        <tr key={tarefa.id}>
                            <th scope="row">{index + 1}</th>
                            {tarefaEditando === tarefa.id ? (
                                <>
                                    <td>
                                        <textarea
                                            value={tarefaAtualizada.nome}
                                            onChange={(e) => setTarefaAtualizada({ ...tarefaAtualizada, nome: e.target.value })}
                                            style={{ whiteSpace: 'pre-wrap' }}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            value={tarefaAtualizada.descricao}
                                            onChange={(e) => setTarefaAtualizada({ ...tarefaAtualizada, descricao: e.target.value })}
                                            style={{ whiteSpace: 'pre-wrap' }}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={tarefaAtualizada.dataInicio}
                                            onChange={(e) => setTarefaAtualizada({ ...tarefaAtualizada, dataInicio: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={tarefaAtualizada.dataFim}
                                            onChange={(e) => setTarefaAtualizada({ ...tarefaAtualizada, dataFim: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={tarefaAtualizada.status}
                                            onChange={(e) => setTarefaAtualizada({ ...tarefaAtualizada, status: e.target.value })}
                                        >
                                            <option value="Pendente">Pendente</option>
                                            <option value="Em andamento">Em andamento</option>
                                            <option value="Concluída">Concluída</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button type="button" className="btn" onClick={() => handleSave(tarefa.id)}>
                                            Salvar
                                        </button>
                                        <button type="button" className="btn" onClick={() => setTarefaEditando(null)}>
                                            Cancelar
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{tarefa.nome}</td>
                                    <td>{tarefa.descricao}</td>
                                    <td>{new Date(tarefa.data_inicio).toLocaleDateString('pt-BR')}</td>
                                    <td>{new Date(tarefa.data_fim).toLocaleDateString('pt-BR')}</td>
                                    <td>{tarefa.status}</td>
                                    <td>
                                        <button type="button" className="btn" onClick={() => handleEditClick(tarefa)}>
                                            <i className="bi bi-pencil-square text-primary"></i>
                                        </button>
                                        <button type="button" className="btn" onClick={() => handleDelete(tarefa.id)}>
                                            <i className="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaTarefas;