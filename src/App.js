import { useMemo, useState } from 'react';
import './App.css';

const initialExpenses = [
  { id: 1, description: 'Salário', category: 'Receita', type: 'income', value: 3500, date: '2026-08-01' },
  { id: 2, description: 'Mercado', category: 'Casa', type: 'expense', value: 420, date: '2026-08-03' },
  { id: 3, description: 'Transporte', category: 'Transporte', type: 'expense', value: 180, date: '2026-08-04' },
  { id: 4, description: 'Freelance', category: 'Receita', type: 'income', value: 800, date: '2026-08-06' },
  { id: 5, description: 'Cinema', category: 'Lazer', type: 'expense', value: 90, date: '2026-08-08' },
];

const categoryOptions = ['Casa', 'Alimentação', 'Transporte', 'Saúde', 'Lazer', 'Educação', 'Receita', 'Outros'];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [formData, setFormData] = useState({
    description: '',
    category: 'Casa',
    value: '',
    type: 'expense',
    date: new Date().toISOString().slice(0, 10),
  });

  const totalIncome = useMemo(
    () => expenses.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.value, 0),
    [expenses]
  );

  const totalExpense = useMemo(
    () => expenses.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.value, 0),
    [expenses]
  );

  const balance = totalIncome - totalExpense;

  const categoryTotals = useMemo(() => {
    const totals = {};

    expenses
      .filter((item) => item.type === 'expense')
      .forEach((item) => {
        totals[item.category] = (totals[item.category] || 0) + item.value;
      });

    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.description || !formData.value) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      description: formData.description,
      category: formData.category,
      type: formData.type,
      value: Number(formData.value),
      date: formData.date,
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setFormData({
      description: '',
      category: 'Casa',
      value: '',
      type: 'expense',
      date: new Date().toISOString().slice(0, 10),
    });
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Controle financeiro</p>
          <h1>Gerenciador de gastos</h1>
        </div>
      </header>

      <main className="dashboard">
        <section className="summary-grid">
          <div className="summary-card income">
            <span>Receitas</span>
            <strong>R$ {totalIncome.toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="summary-card expense">
            <span>Despesas</span>
            <strong>R$ {totalExpense.toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="summary-card balance">
            <span>Saldo</span>
            <strong>R$ {balance.toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="content-grid">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Adicionar movimentação</h2>

            <label>
              Descrição
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Ex: Supermercado"
              />
            </label>

            <div className="inline-fields">
              <label>
                Categoria
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Tipo
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="expense">Despesa</option>
                  <option value="income">Receita</option>
                </select>
              </label>
            </div>

            <div className="inline-fields">
              <label>
                Valor
                <input
                  type="number"
                  name="value"
                  min="0"
                  step="0.01"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
              </label>

              <label>
                Data
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
              </label>
            </div>

            <button type="submit">Salvar</button>
          </form>

          <aside className="panel-card">
            <h2>Gastos por categoria</h2>
            {categoryTotals.length === 0 ? (
              <p className="empty-text">Nenhuma despesa cadastrada.</p>
            ) : (
              <ul className="category-list">
                {categoryTotals.map(([category, value]) => (
                  <li key={category}>
                    <span>{category}</span>
                    <strong>R$ {value.toFixed(2).replace('.', ',')}</strong>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </section>

        <section className="expenses-card">
          <h2>Histórico</h2>
          {expenses.length === 0 ? (
            <p className="empty-text">Nenhuma movimentação cadastrada.</p>
          ) : (
            <div className="expense-list">
              {expenses.map((item) => (
                <div key={item.id} className="expense-item">
                  <div>
                    <p className="expense-name">{item.description}</p>
                    <small>
                      {item.category} • {new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </small>
                  </div>

                  <div className="expense-meta">
                    <span className={item.type === 'income' ? 'amount income-text' : 'amount expense-text'}>
                      {item.type === 'income' ? '+' : '-'} R$ {item.value.toFixed(2).replace('.', ',')}
                    </span>
                    <button type="button" className="delete-btn" onClick={() => handleDelete(item.id)}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
