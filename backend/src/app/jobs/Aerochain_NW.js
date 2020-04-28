import Aircraft from '../Schemas/Aircraft';

export default {
  key: 'Aerochain',
  options: { attempts: 3 },
  async handle({ data }) {
    const { aeroInfo } = data;
    const acft = {
      registration: JSON.stringify(aeroInfo.registration),
      manufacturer: JSON.stringify(aeroInfo.manufacturer),
      model: JSON.stringify(aeroInfo.model),
      serial_number: JSON.stringify(aeroInfo.serial_number),
      icao_type: JSON.stringify(aeroInfo.icao_type),
    };
    await Aircraft.create(acft);
    console.log('Sucesso');
  },
};
