import React, { useState } from 'react';
import api from '../api/api';

const CadastroTarefa = ({ onTarefaCadastrada }) => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('Pendente');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const novaTarefa = { nome, descricao, status };
            await api.post('/tarefas/', novaTarefa, {
                headers: { 'Content-Type': 'application/json' }
              });

            if (onTarefaCadastrada) {
                // onTarefaCadastrada(response.data);
            }

            // Limpar formulário após envio
            setNome('');
            setDescricao('');
            setStatus('Pendente');
        } catch (error) {
            console.error('Erro ao cadastrar tarefa:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Cadastrar Nova Tarefa</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Concluída">Concluída</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroTarefa;
