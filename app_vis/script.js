// Função para criar os contêineres principais
function criarFilterContainer() {
    document.getElementById("filter-container").innerHTML = `
        <div id="options-container-1"></div>
        <div id="options-container-2"></div>
        <div id="options-container-3"></div>`;
}

// Função para limpar o contêiner dos filtros
function limparFilterContainer() {
    document.getElementById("filter-container").innerHTML = '';
}

// Função para limpar o contêiner dos mapas
function limparMapContainer() {
    document.getElementById("map-container").innerHTML = '';
}

// Função para inserir um iframe no contêiner de mapa
function inserirIframe(src, title) {
    document.getElementById("map-container").innerHTML = `
        <iframe src="${src}" 
                title="${title}" 
                id="map-frame" 
                style="width: 100%; height: 550px; border: none;">
        </iframe>`;
}

// Função para exibir o mapa com base no tipo de visualização
function mostrarMapa(tipo) {
    limparFilterContainer();
    let src, title;

    switch (tipo) {
        case "pontos":
            src = "./files/plots/distribuicao_espacial_brasil.html";
            title = "Mapa de Pontos do Brasil";
            break;
        case "biomas":
            src = "./files/plots/distribuicao_espacial_por_bioma.html";
            title = "Mapa de Biomas do Brasil";
            break;
        case "geral_estados":
            src = "./files/plots/map_queimadas_brasil_Novembro_2024.html";
            title = "Mapa Geral dos Estados";
            break;
        default:
            return;
    }

    inserirIframe(src, title);
}

// Função específica para o mapa por estado
function mostrarMapaEstados() {
    criarFilterContainer()
    limparMapContainer()
    document.getElementById("options-container-1").innerHTML = `
        <select id="opcoes-estados">
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
        </select>`;
        document.getElementById("options-container-2").innerHTML = `
            <button onclick="gerarMapaEstado()">Gerar</button>`;
}

function gerarMapaEstado() {
    const estado = document.getElementById('opcoes-estados').value;
    inserirIframe(`./files/plots/por_estado/${estado}_map_queimadas.html`, "Mapa por Estado");
}

// Função para exibir o mapa por classificação
function mostrarMapaClass() {
    criarFilterContainer();
    limparMapContainer();

    // Cria o conteúdo inicial no contêiner
    document.getElementById("filter-container").innerHTML = `
        <select id="opcoes-class" onchange="atualizarNivelClass()">
            <option value="frp">Potência do Fogo</option>
            <option value="risco_fogo">Risco de Fogo</option>
        </select>
        <select id="opcoes-class-nivel">
            <option value="">Selecione uma classificação</option>
        </select>
        <button onclick="gerarMapaClass()">Gerar</button>
    `;

    // Atualiza os níveis iniciais com base na opção padrão
    atualizarNivelClass();
}

// Função para atualizar o nível de classificação com base na seleção atual
function atualizarNivelClass() {
    const tipo = document.getElementById('opcoes-class').value;
    let options = '';

    if (tipo === 'frp') {
        options = `
            <option value="Muito Baixa">Muito Baixa</option>
            <option value="Baixa">Baixa</option>
            <option value="Media">Média</option>
            <option value="Alta">Alta</option>
            <option value="Muito Alta">Muito Alta</option>`;
    } else if (tipo === 'risco_fogo') {
        options = `
            <option value="Baixo">Baixo</option>
            <option value="Medio">Médio</option>
            <option value="Alto">Alto</option>`;
    }

    document.getElementById("opcoes-class-nivel").innerHTML = options;
}

// Função para gerar o mapa com base na classificação selecionada
function gerarMapaClass() {
    const tipo = document.getElementById('opcoes-class').value;
    const nivel = document.getElementById('opcoes-class-nivel').value;

    if (!nivel) {
        alert("Por favor, selecione um nível de classificação.");
        return;
    }

    inserirIframe(`./files/plots/por_categoria/${tipo}/queimadas_${nivel}_${tipo}.html`, "Mapa por Classificação");
}

function pagInicial(){
    document.getElementById("map-container").innerHTML = `
            <p> A ocorrência de incêndios e queimadas representa um dos mais críticos problemas ambientais enfrentados pelo Brasil, com implicações que vão desde a perda de biodiversidade até impactos severos na saúde humana e no clima global. Apesar da disponibilidade de grandes volumes de dados relacionados a esses eventos, os desafios na comunicação clara e impactante dessas informações permanecem, especialmente quando o público-alvo inclui tanto especialistas quanto a sociedade em geral.
            <br>
            Este projeto tem como objetivo principal criar visualizações informativas e intuitivas sobre dados de queimadas no Brasil, tornando-os acessíveis tanto para especialistas quanto para o público em geral. O projeto utiliza dados abertos da plataforma gov.br, focando inicialmente em análises mensais de focos de incêndio, com possibilidade de expansão para padrões anuais e sazonais.
            <br> 
            
            
            Etapas do Projeto:

                Exploração e Tratamento dos Dados: Os dados brutos são baixados e carregados da plataforma gov.br. Em seguida, são realizadas as seguintes etapas:
                Limpeza dos dados: Remoção de entradas com valores faltantes ou inconsistentes (-999).
                Formatação: Conversão de datas e horas para o formato apropriado.
                Seleção de atributos: Exclusão de atributos irrelevantes para o projeto (e.g., municipio_id, estado_id, pais_id).
                Cálculo de estatísticas: Porcentagem de valores faltantes, redução total dos dados.
                Criação das Visualizações: Com os dados tratados, são criadas diversas visualizações utilizando a biblioteca Plotly, incluindo:
                Visualização Geral: Mapa do Brasil com a distribuição espacial dos focos de incêndio, permitindo identificar a localização, data, hora, bioma, potência do fogo, risco de fogo, dias sem chuva e precipitação de cada foco.
                Visualizações por Estados: Mapa do Brasil mostrando o número de queimadas por estado, com a possibilidade de visualizar as informações detalhadas de cada estado.
                Visualizações por Biomas: Mapa do Brasil mostrando a distribuição espacial dos focos de incêndio por bioma, com a área colorida indicando a intensidade das queimadas.
                Visualizações por Municípios: Mapas individuais para cada estado, mostrando a distribuição das queimadas por município.
                Classificação e Visualização por Categoria: Os dados são classificados em categorias com base na potência do fogo (frp) e no risco de fogo, permitindo a criação de visualizações que destacam áreas com diferentes níveis de risco.
                Geração de arquivos HTML: Todas as visualizações geradas são salvas em arquivos HTML para fácil acesso e compartilhamento. 
                
            Características Principais dos Dados:

                    Formato: CSV (Comma-Separated Values).<br>
                    Conteúdo: Informações sobre focos de incêndio, incluindo localização geográfica, data e hora do registro, bioma, intensidade do fogo, risco de fogo e dados meteorológicos.<br>
                    Tamanho Original: 588.262 registros e 16 colunas.<br>
                    Tamanho Utilizado: 50.000 registros (primeiras 50.000 linhas do arquivo original) e 15 colunas após o tratamento dos dados.<br>
                
                Atributos:<br>
                    
                    id: Identificador único para cada registro.<br>
                    lat: Latitude do foco de incêndio.<br>
                    lon: Longitude do foco de incêndio.<br>
                    data_hora_gmt: Data e hora do registro em GMT.<br>
                    satelite: Satélite responsável pelo registro.<br>
                    municipio: Município onde o foco foi registrado.<br>
                    estado: Estado onde o foco foi registrado.<br>
                    municipio_id: Código numérico do município.<br>
                    estado_id: Código numérico do estado.<br>
                    pais_id: Código numérico do país.<br>
                    numero_dias_sem_chuva: Número de dias sem chuva na região.<br>
                    precipitacao: Precipitação em mm.<br>
                    risco_fogo: Índice de risco de fogo.<br>
                    bioma: Bioma onde o foco foi registrado.<br>
                    frp: Fire Radiative Power (potência radiativa do fogo).<br>
                    date: Data do registro (extraída de data_hora_gmt).<br>
                    time: Hora do registro (extraída de data_hora_gmt).<br>
                
            Tratamento dos Dados:

                O conjunto de dados passou por um processo de tratamento para garantir a qualidade e a consistência das informações, incluindo:

                Remoção de valores faltantes (NaN) nas colunas numero_dias_sem_chuva, precipitacao, risco_fogo e frp.
                Exclusão de entradas com valor -999 nas colunas numero_dias_sem_chuva, precipitacao, risco_fogo e frp.
                Formatação da data e hora para um formato mais adequado à análise.
                Remoção de atributos irrelevantes para o projeto (id, pais, municipio_id, estado_id, pais_id).
                Redução dos Dados:

                Após o tratamento, houve uma redução significativa no tamanho do conjunto de dados:

                Redução total de aproximadamente 20% do conjunto de dados original.
            </p>`;
}
