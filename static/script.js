import {content} from './regions.js'

const getTemplate = () => {
    return `
        <div class="select">
            <select id="char" class="my-select"></select>
            <button name="button" type="button" class="my-btn">Показать_статистику</button>
        </div>
        <div id="demo"></div>
        `
}

document.getElementById('render').insertAdjacentHTML('beforeend', getTemplate())

for (let key in content) {
    document.getElementById('char').insertAdjacentHTML('beforeend',
        `<option value="${content[key]}">${key}</option>`)

}
const button = document.querySelector('button')

button.addEventListener("click", () => {
    let doUrl = document.querySelector('#char').value
    const url = 'http://localhost/covid?' + doUrl

        fetch(url, {
            method: 'get',
            headers: {
                Accept: 'application/json'
            }})
            .then((resp) => resp.json())
            .then(function(data) {
                data = data.map((n, i, a) => ({
                    ...n,
                    sick: n.sick - (a[i + 1]?.sick ?? 0),
                    died: n.died - (a[i + 1]?.died ?? 0),
                    healed: n.healed - (a[i + 1]?.healed ?? 0),
                }))

                document.getElementById('demo').innerHTML = `
                <table class="table">
                    <tbody>
                      <tr>
                        <td><b>Данные за сутки на</b></td>
                        <td><b>${data[0].date}</b></td>
                      </tr>
                      <tr>
                        <td>Выявлено вновь заболевших</td>
                        <td>${data[0].sick}</td>
                      </tr>
                      <tr>
                        <td>Госпитализировано</td>
                        <td>${data[0].hospitalized}</td>
                      </tr>
                      <tr>
                        <td>Выписано</td>
                        <td>${data[0].healed}</td>
                      </tr>
                      <tr>
                        <td>Смертей</td>
                        <td>${data[0].died}</td>
                      </tr>
                    </tbody>
                  </table>
                        `

                document.getElementById('canvas').innerHTML = `<canvas id="myChart"></canvas>`
                const newData = data
                newData.pop()
                newData.reverse()

                const dates = newData.map(a => a.date)
                const nsick = newData.map(a => a.sick)
                const nhospitalized = newData.map(a => a.hospitalized)

                const grData = {
                    labels: dates,
                    datasets: [
                      {
                        label: 'Выявлено вновь заболевших',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: nsick,
                    }
                    ,
                      {
                        label: 'Госпитализировано',
                        backgroundColor: 'rgb(0, 122, 204)',
                        borderColor: 'rgb(0, 122, 204)',
                        data: nhospitalized,
                    }
                  ]
                }

                const config = {
                    type: 'line',
                    data: grData,
                    options: {}
                }

                const myChart = new Chart(
                    document.getElementById('myChart'),
                    config
                )


            })

            .catch(function(error) {
                document.getElementById('demo').innerHTML = 'Ошибка'
                console.log(error)
            })

    })



