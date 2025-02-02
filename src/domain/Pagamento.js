class Pagamento {
    constructor(id, venda_id, codigo_pagamento, status_pagamento) {
        this.id = id;
        this.venda_id = venda_id;
        this.codigo_pagamento = codigo_pagamento;
        this.status_pagamento = status_pagamento;
    }
}

module.exports = Pagamento;
