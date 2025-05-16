
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/habitos" element={<HabitosPage />} />
        <Route path="/hoje" element={<HojePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
