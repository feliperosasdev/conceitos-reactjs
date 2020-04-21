import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    try {
      const identify = Date.now();
      const repository = {
        title: `Meu Projeto ${identify}`,
        url: `https://github.com/project/${identify}`,
        techs: ["node", "react"],
      };
      const { data } = await api.post("/repositories", repository);
      setRepositories([...repositories, data]);
    } catch (error) {
      alert(`Ocorreu um erro: ${error}`);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const uri = `/repositories/${id}`;
      const res = await api.delete(uri);

      setRepositories(repositories.filter((repo) => repo.id !== id));
    } catch (error) {
      alert(`Ocorreu um erro: ${error}`);
    }
  }

  useEffect(() => {
    api.get("/repositories").then(({ data: repositories }) => {
      setRepositories(repositories);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
