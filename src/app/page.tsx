export default function Home() {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-gray-100">
      {/* Seção esquerda com fundo visual */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900"></div>

      {/* Seção direita com formulário */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-neutral-900 p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <div className="px-6 py-2 bg-purple-700 rounded-full">
              <span className="text-white font-bold text-xl">Playzy</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-purple-500">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm text-center text-gray-400">
            Faça login para continuar explorando
          </p>

          <form className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                className="w-full px-4 py-3 mt-1 bg-neutral-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                className="w-full px-4 py-3 mt-1 bg-neutral-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 font-bold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Entrar
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Esqueceu sua senha?{" "}
            <a href="#" className="text-purple-400 hover:underline">
              Clique aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
