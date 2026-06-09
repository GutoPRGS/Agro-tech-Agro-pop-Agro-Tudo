// Seleção de elementos do DOM
const plantForm = document.getElementById('plant-form');
const plantNameInput = document.getElementById('plant-name');
const plantPriceInput = document.getElementById('plant-price');
const plantTableBody = document.querySelector('#plant-table tbody');
const totalValueSpan = document.getElementById('total-value');

// Lista para armazenar as plantas temporariamente
let plantsList = [];

// Função para atualizar a tabela e o valor total na tela
function updateUI() {
    // Limpa a tabela antes de reconstruir
    plantTableBody.innerHTML = '';
    
    let total = 0;

    // Adiciona cada planta na tabela
    plantsList.forEach((plant, index) => {
        total += plant.price;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plant.name}</td>
            <td>R$ ${plant.price.toFixed(2).replace('.', ',')}</td>
            <td><button class="btn-delete" onclick="removePlant(${index})">Remover</button></td>
        `;
        plantTableBody.appendChild(row);
    });

    // Atualiza o valor total formatado
    totalValueSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para adicionar uma nova planta
plantForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    const name = plantNameInput.value.trim();
    const price = parseFloat(plantPriceInput.value);

    if (name && !isNaN(price)) {
        // Cria o objeto da planta e joga na lista
        plantsList.push({ name, price });
        
        // Atualiza a interface
        updateUI();

        // Limpa os campos do formulário
        plantForm.reset();
        plantNameInput.focus();
    }
});

// Função para remover uma planta da lista
function removePlant(index) {
    plantsList.splice(index, 1); // Remove o item pelo índice
    updateUI(); // Atualiza a tela
}
