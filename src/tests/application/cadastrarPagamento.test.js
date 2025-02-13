
const { cadastrarPagamento } = require("../../application/cadastrarPagamento");
const sinon = require("sinon");
const Pagamento = require("../../infrastructure/database/models/PagamentoModel");

describe("Testes para cadastrarPagamento", () => {
    afterEach(() => {
        sinon.restore();
    });

    test("Deve cadastrar um pagamento com sucesso", async () => {
        const mockPagamento = { id: 1, venda_id: 10, codigo_pagamento: "ABC123", status_pagamento: "APROVADO" };

        sinon.stub(Pagamento, "create").resolves(mockPagamento);

        const resultado = await cadastrarPagamento(10, "ABC123", "APROVADO");

        expect(resultado).toEqual(mockPagamento);
        expect(Pagamento.create.calledOnce).toBeTruthy();
    });

    test("Deve lançar um erro se algum campo obrigatório estiver faltando", async () => {
        await expect(cadastrarPagamento(null, "ABC123", "APROVADO")).rejects.toThrow("Todos os campos são obrigatórios!");
        await expect(cadastrarPagamento(10, null, "APROVADO")).rejects.toThrow("Todos os campos são obrigatórios!");
        await expect(cadastrarPagamento(10, "ABC123", null)).rejects.toThrow("Todos os campos são obrigatórios!");
    });


});
