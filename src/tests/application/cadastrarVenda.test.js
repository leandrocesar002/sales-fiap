const { cadastrarVenda } = require("../../application/cadastrarVenda");
const Venda = require("../../infrastructure/database/models/VendaModel");
const veiculoService = require("../../services/veiculoService");
const sinon = require("sinon");

describe("Testes para cadastrarVenda", () => {
    beforeEach(() => {
        sinon.restore(); 
    });

    afterEach(() => {
        sinon.restore(); 
    });

    test("Deve cadastrar uma venda com sucesso", async () => {
        const mockVeiculo = { id: 1, modelo: "Carro Teste" };
        const mockVenda = { id: 1, veiculo_id: 1, cpf_comprador: "12345678900", data_venda: "2025-02-10" };

        // ✅ Corrigido: Agora o mock impede chamadas reais à API de veículos
        const veiculoStub = sinon.stub(veiculoService, "buscarVeiculoPorId").resolves(mockVeiculo);
        const vendaStub = sinon.stub(Venda, "create").resolves(mockVenda);

        const resultado = await cadastrarVenda("44123bc8-91c3-4adf-a793-746422ddb829", "12345678900", "2025-02-10");

        expect(resultado).toEqual(mockVenda);
        expect(vendaStub.calledOnce).toBeTruthy();
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
        // ✅ Corrigido: Agora retorna null corretamente, sem erro 500
        sinon.stub(veiculoService, "buscarVeiculoPorId").resolves(null);

        await expect(cadastrarVenda(1, "12345678900", "2025-02-10"))
            .rejects.toThrow("Veículo não encontrado no serviço externo.");
    });


});
