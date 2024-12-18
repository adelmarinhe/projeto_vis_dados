# Visualização de Dados de Queimadas no Brasil

## Descrição do Projeto

Este projeto tem como objetivo criar visualizações informativas e intuitivas de dados sobre queimadas no Brasil, utilizando dados abertos do governo brasileiro. O foco é auxiliar na compreensão dos padrões, tendências e áreas críticas de ocorrência de queimadas, tornando a informação acessível tanto para especialistas quanto para o público em geral.

## Dados

Os dados utilizados neste projeto são provenientes da plataforma [gov.br](https://terrabrasilis.dpi.inpe.br/queimadas/portal/dados-abertos/#da-focos), que disponibiliza informações detalhadas sobre focos de queimadas no Brasil. Os dados são processados e limpos utilizando a biblioteca Pandas em Python.

## Visualizações

As visualizações são criadas utilizando a biblioteca Plotly e incluem:

* Mapa geral da distribuição espacial das queimadas no Brasil.
* Mapas por estado, mostrando o número de ocorrências de queimadas.
* Mapa por bioma, destacando as áreas afetadas por queimadas em cada bioma.
* Mapas por município, exibindo a concentração de queimadas por município.
* Visualizações classificadas por Fire Power (FRP) e risco de fogo, permitindo a análise de diferentes níveis de severidade das queimadas.

## Como Executar o Código

1. Clone este repositório em sua máquina local.
2. Abra o notebook `main.ipynb` no Google Colab.
3. Execute as células do notebook para gerar as visualizações.
4. As visualizações serão salvas na pasta `/content/drive/MyDrive/plots_vis_dados/`.

## Autores

* José Adeljan Marinho da Silva
