
const { listarPagamentos } = require("../../application/listarPagamentos");
const Pagamento = require("../../infrastructure/database/models/PagamentoModel");
const sinon = require("sinon");

describe("Testes para listarPagamentos", () => {
    afterEach(() => {
        sinon.restore(); 
    });

    test("Deve retornar uma lista de pagamentos", async () => {
        const mockPagamentos = [
            { id: 1, venda_id: 101, codigo_pagamento: "ABC123", status_pagamento: "APROVADO" },
            { id: 2, venda_id: 102, codigo_pagamento: "XYZ789", status_pagamento: "PENDENTE" }
        ];

        sinon.stub(Pagamento, "findAll").resolves(mockPagamentos);

        const resultado = await listarPagamentos();

        expect(resultado).toEqual(mockPagamentos);
        expect(Pagamento.findAll.calledOnce).toBeTruthy();
    });

    test("Deve retornar uma lista vazia quando não houver pagamentos", async () => {
        sinon.stub(Pagamento, "findAll").resolves([]);

        const resultado = await listarPagamentos();

        expect(resultado).toEqual([]);
        expect(Pagamento.findAll.calledOnce).toBeTruthy();
    });

});
