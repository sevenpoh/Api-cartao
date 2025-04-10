from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/testar', methods=['POST'])
def testar_cartao():
    dados = request.json
    numero = dados.get("numero")
    validade = dados.get("validade")
    cvv = dados.get("cvv")
    
    # Aqui entra a integração com o site (automatização futura)
    # Por enquanto só retorna que recebeu os dados
    return jsonify({
        "status": "recebido",
        "numero": numero,
        "validade": validade,
        "cvv": cvv
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
