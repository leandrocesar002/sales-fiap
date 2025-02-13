const { cadastrarVenda } = require("../../application/cadastrarVenda");
const Venda = require("../../infrastructure/database/models/VendaModel");
const veiculoService = require("../../services/veiculoService"); 
const sinon = require("sinon");

describe("Testes para cadastrarVenda", () => {
    afterEach(() => {
        sinon.restore(); 
    });

    test("Deve cadastrar uma venda com sucesso", async () => {
        const mockVeiculo = { id: 1, modelo: "Carro Teste" };
        const mockVenda = { id: 1, veiculo_id: 1, cpf_comprador: "12345678900", data_venda: "2025-02-10" };

        sinon.stub(veiculoService, "buscarVeiculoPorId").resolves(mockVeiculo);
        sinon.stub(Venda, "create").resolves(mockVenda);

        const resultado = await cadastrarVenda(1, "12345678900", "2025-02-10");

        expect(resultado).toEqual(mockVenda);
        expect(Venda.create.calledOnce).toBeTruthy();
    });

    test("Deve lançar um erro se algum campo obrigatório estiver ausente", async () => {
        await expect(cadastrarVenda(null, "12345678900", "2025-02-10"))
            .rejects.toThrow("Todos os campos são obrigatórios!");
        await expect(cadastrarVenda(1, null, "2025-02-10"))
            .rejects.toThrow("Todos os campos são obrigatórios!");
        await expect(cadastrarVenda(1, "12345678900", null))
            .rejects.toThrow("Todos os campos são obrigatórios!");
    });

    test("Deve lançar um erro se o veículo não for encontrado", async () => {
        sinon.stub(veiculoService, "buscarVeiculoPorId").resolves(null);

        await expect(cadastrarVenda(1, "12345678900", "2025-02-10"))
            .rejects.toThrow("Veículo não encontrado no serviço externo.");
    });

    test("Deve lançar um erro se houver falha no banco de dados", async () => {
        const mockVeiculo = { id: 1, modelo: "Carro Teste" };
        sinon.stub(veiculoService, "buscarVeiculoPorId").resolves(mockVeiculo);
        sinon.stub(Venda, "create").throws(new Error("Erro de conexão"));

        await expect(cadastrarVenda(1, "12345678900", "2025-02-10"))
            .rejects.toThrow("Erro ao cadastrar venda: Erro de conexão");
    });
});
