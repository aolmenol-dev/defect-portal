const ROOM_IDS = {
  "Aljibe": "wjokalg", "Almacen jardineria": "jdlmebx", "Almacén": "abknoym",
  "Ascensor": "qlbyopo", "Aseo": "xxjpyxj", "Baño 1": "ylnbolm",
  "Baño 2": "lxjgbxw", "Baño 3": "ojkbajx", "Baño 4": "mjwkzjj",
  "Baño 5": "exwnzxq", "Baño femenino": "gqgyaqj", "Baño masculino": "kdoekda",
  "Baño minusvalido": "pxkdyxe", "Baño turco": "bjbwejm", "Bodega": "dxjnbxn",
  "Buhardilla": "zowdeop", "Caminos": "najpwan", "Cocina": "wjokajg",
  "Comedor": "jdlmedx", "Contadores agua": "abknobm", "Contadores luz": "qlbyolo",
  "Control": "xxjpywj", "Corralas": "ylnboym", "Cuarto basura": "lxjgbow",
  "Cuarto Caldera": "ojkbawx", "Cuarto extraccion": "mjwkzmj",
  "Cuarto instalaciones": "exwnzqq", "Cuarto limpieza": "gqgyakj",
  "Cuarto personal": "kdoekla", "Cuarto tecnico": "pxkdywe",
  "Cuarto teleco": "bjbweom", "Cubierta": "dxjnben", "Despacho": "zowdelp",
  "Despensa": "najpwen", "Dirty Kicthen": "wjokapg", "Distribuidor": "jdlmeyx",
  "Dormitorio 1": "abknolm", "Dormitorio 2": "qlbyojo", "Dormitorio 3": "xxjpylj",
  "Dormitorio 4": "ylnboxm", "Dormitorio 5": "lxjgblw", "Dormitorio 6": "ojkbaex",
  "Dormitorio 7": "mjwkzoj", "Dormitorio 8": "exwnzaq", "Dormitorio 9": "gqgyajj",
  "Entrada": "kdoekya", "Escalera": "pxkdyge", "Fachada": "bjbwepm",
  "Garaje": "dxjnbzn", "General": "zowdemp", "Gimnasio": "najpwmn",
  "Grupo presion": "wjokayg", "Hamann": "jdlmejx", "Jardines": "abknopm",
  "Jardín": "ylnboxo", "Lavadero": "lxjgbqj", "Local": "ojkbaqg",
  "Oficina": "mjwkzqe", "Otros": "exwnzde", "Otros….": "gqgyaxq",
  "Pasillo": "kdoekal", "Pasillo Z.C": "pxkdyqg", "Patio": "bjbwedd",
  "Piscina": "dxjnbdy", "Piscina pequeña": "zowdeqy", "Porche": "najpwqp",
  "Portal": "wjokawe", "Resto Urbanización": "jdlmeap", "RITS": "abknoja",
  "Sala extraccion": "qlbyoqn", "Salón": "xxjpybn", "Sauna": "ylnbodo",
  "Show room": "lxjgbyj", "Sin definir": "ojkbamg", "Solarium": "mjwkzle",
  "Sotano Z.C": "exwnzle", "Tendedero": "gqgyamq", "Terraza": "kdoekpl",
  "Terraza 1": "pxkdyeg", "Terraza 2": "bjbwekd", "Terraza 3": "dxjnbyy",
  "Terraza 4": "zowdeay", "Terraza Salón": "najpwop", "Terraza Técnica": "wjokaxe",
  "Trastero": "jdlmekp", "Vestibulo Baja": "abknoga", "Vestibulo Garaje": "qlbyogn",
  "Vestibulo Primera": "xxjpyan", "Vestibulo Segunda": "ylnboao",
  "Vestidor": "lxjgbnj", "Vestuario": "ojkbang", "Vestíbulo": "mjwkzne",
  "Vestíbulo de entrada": "exwnzke", "Vinoteca": "gqgyabq", "Vivienda": "kdoeknl",
  "Vivienda General": "pxkdyjg", "Zona Comunes": "bjbwemd",
  "Zona infantil": "dxjnbgy", "Zona verde": "zowdeyy"
};

const CATEGORY_IDS = {
  "General defect": "poxnoeze", "Additional works": "ngadgobn",
  "Assessment": "qklwkgno", "Changes in planning": "mdjbdlyj",
  "Defect": "kqdxqpja", "Due-diligence": "doxaoykn", "Hindrance": "jqdgqkwx",
  "Hint": "qklwkgeo", "Inventory": "lmxpmybw", "Lack of preliminary work": "gwqowmaj",
  "Misgiving": "doxaoybn", "Note": "ngadgown", "Task": "qklwkgoo",
  "Warranty defect": "ogjzgnkx", "Remaining work": "gwqowbgj", "RFI": "bqjaqmbm",
  "Snag": "ngadgxjn", "Clean up": "jqdgqnlx", "Condition Schedule": "ogjzgngg",
  "Maintenance": "kqdxqnql", "Observation": "zxobxyxy", "Document": "wdjgdqde"
};

const WORKATO_WEBHOOK = 'https://webhooks.eu.workato.com/webhooks/rest/33ef3bdf-71c7-4365-a26d-6ec1c0b5d52f/webapp_defects';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const secret = req.headers['x-form-secret'];
  if (secret !== process.env.FORM_SECRET) {
    return res.status(403).send('Forbidden');
  }

  const data = req.body;
  if (!data) return res.status(400).send('Invalid JSON');

  const sanitize = (str) => String(str || '').replace(/<[^>]*>/g, '').trim().slice(0, 500);

  const roomText = sanitize(data.room);
  const categoryText = sanitize(data.category);
  const unitId = sanitize(data.unit_id);
  const description = sanitize(data.description);
  const contactName = sanitize(data.contact_name);
  const contactEmail = sanitize(data.contact_email);

  const roomId = ROOM_IDS[roomText] || null;
  const categoryId = CATEGORY_IDS[categoryText] || null;

  const ticketPayload = {
    ticket: {
      subject: `[${unitId}] ${categoryText} - ${roomText}`,
      ticket_type_id: 'mdeakza',
      component_id: 'aqypekl',
      typed_values: {
        [FIELD_UNIT_ID]: unitId,
        [FIELD_ROOM]: roomId,
        [FIELD_CATEGORY]: categoryId,
        [FIELD_DESCRIPTION]: description,
        [FIELD_CONTACT_NAME]: contactName,
        [FIELD_CONTACT_EMAIL]: contactEmail
      }
    }
  };

  console.log('Token starts with:', process.env.PLANRADAR_API_TOKEN?.substring(0, 10));
  console.log('Token length:', process.env.PLANRADAR_API_TOKEN?.length);

  try {
    const response = await fetch(
      `${PLANRADAR_BASE}/${PLANRADAR_CUSTOMER}/projects/${PLANRADAR_PROJECT}/tickets?auth_token=${process.env.PLANRADAR_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PLANRADAR_API_TOKEN}`,
          'X-Auth-Token': process.env.PLANRADAR_API_TOKEN
        },
        body: JSON.stringify(ticketPayload)
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('PlanRadar error:', response.status, errText);
      return res.status(502).send('PlanRadar API error: ' + response.status);
    }

    const json = await response.json();
    const ref = json.data?.attributes?.['sequential-id'] || 'DEF-' + Date.now().toString(36).toUpperCase();
    return res.status(200).json({ success: true, ref });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).send('Internal error');
  }
}

