import { useMemo, useState } from 'react';
import './App.css';

const categoryOptions = ['Casa', 'Alimentação', 'Transporte', 'Saúde', 'Lazer', 'Educação', 'Receita', 'Outros'];

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function App() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    category: 'Casa',
    value: '',
    type: 'expense',
    date: new Date().toISOString().slice(0, 10),
  });
  const [filters, setFilters] = useState({
    month: '',
    category: '',
    type: '',
  });

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((item) => {
        const matchesMonth = !filters.month || item.date.startsWith(filters.month);
        const matchesCategory = !filters.category || item.category === filters.category;
        const matchesType = !filters.type || item.type === filters.type;

        return matchesMonth && matchesCategory && matchesType;
      }),
    [expenses, filters]
  );

  const totalIncome = useMemo(
    () => filteredExpenses.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.value, 0),
    [filteredExpenses]
  );

  const totalExpense = useMemo(
    () => filteredExpenses.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.value, 0),
    [filteredExpenses]
  );

  const balance = totalIncome - totalExpense;

  const categoryTotals = useMemo(() => {
    const totals = {};

    filteredExpenses
      .filter((item) => item.type === 'expense')
      .forEach((item) => {
        totals[item.category] = (totals[item.category] || 0) + item.value;
      });

    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [filteredExpenses]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'type') {
      setFormData((prev) => ({
        ...prev,
        type: value,
        category: value === 'income' ? 'Receita' : prev.category === 'Receita' ? 'Casa' : prev.category,
      }));
      return;
    }

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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ month: '', category: '', type: '' });
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">F</div>
          <div>
            <p className="eyebrow">Controle financeiro</p>
            <h1>FlowBudget</h1>
          </div>
        </div>

        <div className="topbar-actions">
          <span className="soft-pill">Agosto 2026</span>
          <button type="button" className="ghost-button">Resumo</button>
        </div>
      </header>

      <main className="dashboard">
        <section className="summary-grid">
          <article className="summary-card income">
            <div className="summary-header">
              <span>Receitas</span>
              <span className="summary-badge income-badge">+ </span>
            </div>
            <strong>{currencyFormatter.format(totalIncome)}</strong>
          </article>

          <article className="summary-card expense">
            <div className="summary-header">
              <span>Despesas</span>
              <span className="summary-badge expense-badge">− </span>
            </div>
            <strong>{currencyFormatter.format(totalExpense)}</strong>
          </article>

          <article className="summary-card balance">
            <div className="summary-header">
              <span>Saldo</span>
              <span className="summary-badge balance-badge">= </span>
            </div>
            <strong>{currencyFormatter.format(balance)}</strong>
          </article>
        </section>

        <section className="content-grid">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="section-heading">
              <h2>Adicionar movimentação</h2>
              <span className="section-tag">Nova</span>
            </div>

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

            <button type="submit">Salvar transação</button>
          </form>

          <aside className="panel-card">
            <div className="section-heading">
              <h2>Gastos por categoria</h2>
              <span className="section-tag muted">Resumo</span>
            </div>

            {categoryTotals.length === 0 ? (
              <p className="empty-text">Nenhuma despesa cadastrada.</p>
            ) : (
              <ul className="category-list">
                {categoryTotals.map(([category, value]) => (
                  <li key={category}>
                    <div className="category-label">
                      <span className="dot" aria-hidden="true" />
                      <span>{category}</span>
                    </div>
                    <strong>{currencyFormatter.format(value)}</strong>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </section>

        <section className="expenses-card">
          <div className="section-heading">
            <h2>Histórico</h2>
            <span className="section-tag muted">{filteredExpenses.length} itens</span>
          </div>

          <div className="filters-bar">
            <label>
              Mês
              <input type="month" name="month" value={filters.month} onChange={handleFilterChange} />
            </label>

            <label>
              Categoria
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="">Todas</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Tipo
              <select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="expense">Despesas</option>
                <option value="income">Receitas</option>
              </select>
            </label>

            <button type="button" className="clear-filters-btn" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>

          {expenses.length === 0 ? (
            <p className="empty-text">Nenhuma movimentação cadastrada.</p>
          ) : filteredExpenses.length === 0 ? (
            <p className="empty-text">Nenhuma movimentação encontrada com esses filtros.</p>
          ) : (
            <div className="expense-list">
              {filteredExpenses.map((item) => (
                <div key={item.id} className="expense-item">
                  <div className="expense-main">
                    <div className={`money-icon ${item.type === 'income' ? 'income' : 'expense'}`}>
                      {item.type === 'income' ? '+' : '-'}
                    </div>
                    <div>
                      <p className="expense-name">{item.description}</p>
                      <small>
                        {item.category} • {new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR')}
                      </small>
                    </div>
                  </div>

                  <div className="expense-meta">
                    <span className={item.type === 'income' ? 'amount income-text' : 'amount expense-text'}>
                      {item.type === 'income' ? '+' : '-'} {currencyFormatter.format(item.value)}
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
