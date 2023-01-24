function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

logs = []
teste = 'MENSAGEM DE TESTE'
const WAIT = 1000
const VACINA_ADULTO = 'VACINA CONTRA SARS-COV2'
const VACINA_PEDIATRICA = 'VACINA CONTRA SARS-COV2 - PEDIATRICA'

async function init() {
	//console.log('init')
	
	insumos = app.field('INSUMO')
	
	return app.getObject('qv-03','pLBKvrj').then(result => {
		output = {
			'datas': [],
			'totais': []
		}
		result.enigmaModel.layout.qHyperCube.qDataPages[0].qMatrix.forEach((el, i) => {
			output['datas'].push(el[0].qText)
			output['totais'].push(el[1].qNum)
		})
		logs.push({'TODAS AS DATAS': output})
		
		insumos.clear()
		insumos.selectValues([VACINA_PEDIATRICA], true, true)
		
		return delay(WAIT).then(() => {
			return app.getObject('qv-03','pLBKvrj').then(result => {
				output = {
					'datas': [],
					'totais': []
				}
				result.enigmaModel.layout.qHyperCube.qDataPages[0].qMatrix.forEach((el, i) => {
					output['datas'].push(el[0].qText)
					output['totais'].push(el[1].qNum)
				})
				logs.push({'PEDIATRICA': output})
				//console.log('finish pediatrica')
				
				insumos.clear()
				insumos.selectValues([VACINA_ADULTO], true, true)
				return delay(WAIT).then(() => {
					return app.getObject('qv-03','pLBKvrj').then(result => {
						output = {
							'datas': [],
							'totais': []
						}
						result.enigmaModel.layout.qHyperCube.qDataPages[0].qMatrix.forEach((el, i) => {
							output['datas'].push(el[0].qText)
							output['totais'].push(el[1].qNum)
						})
						logs.push({'ADULTA': output})
						//console.log('finish adulta')
						return logs
					})
				})
			})
			//console.log('finish')
		});
	})
}
await init()