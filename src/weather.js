module.exports={
    weatherReport: (data) =>{
        return new Promise((resolve,reject) => {
            var message = '';
            message = message + 'Previsão do Tempo: :weather' + data.data.icon + ':'
            message = message + '\n\nCidade: ' + data.name + ' ' + data.state;
            message = message + '\nTemperatura: ' + data.data.temperature + ' ºC ';
            message = message + '\nSensação: ' + data.data.sensation + ' ºC';
            message = message + '\nUmidade: ' + data.data.humidity + ' %\n';
            message = message + data.data.condition
            message = message + '\n\nMedido em: ' + data.data.date;
            
            resolve(message);
        })
    }
}