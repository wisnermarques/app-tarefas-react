import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ListaTarefas = () => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        api.get('/tarefas/').then(res => {
            setTarefas(res.data.results || res.data);
        });
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Tarefas</h2>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tarefas.map(tarefa => (
                        <tr>
                            <th scope="row">{tarefa.id}</th>
                            <td>{tarefa.nome}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaTarefas;