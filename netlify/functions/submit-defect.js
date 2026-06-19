}const ROOM_IDS = {
  "Aljibe": "wjokalg",
  "Almacen jardineria": "jdlmebx",
  "Almacén": "abknoym",
  "Ascensor": "qlbyopo",
  "Aseo": "xxjpyxj",
  "Baño 1": "ylnbolm",
  "Baño 2": "lxjgbxw",
  "Baño 3": "ojkbajx",
  "Baño 4": "mjwkzjj",
  "Baño 5": "exwnzxq",
  "Baño femenino": "gqgyaqj",
  "Baño masculino": "kdoekda",
  "Baño minusvalido": "pxkdyxe",
  "Baño turco": "bjbwejm",
  "Bodega": "dxjnbxn",
  "Buhardilla": "zowdeop",
  "Caminos": "najpwan",
  "Cocina": "wjokajg",
  "Comedor": "jdlmedx",
  "Contadores agua": "abknobm",
  "Contadores luz": "qlbyolo",
  "Control": "xxjpywj",
  "Corralas": "ylnboym",
  "Cuarto basura": "lxjgbow",
  "Cuarto Caldera": "ojkbawx",
  "Cuarto extraccion": "mjwkzmj",
  "Cuarto instalaciones": "exwnzqq",
  "Cuarto limpieza": "gqgyakj",
  "Cuarto personal": "kdoekla",
  "Cuarto tecnico": "pxkdywe",
  "Cuarto teleco": "bjbweom",
  "Cubierta": "dxjnben",
  "Despacho": "zowdelp",
  "Despensa": "najpwen",
  "Dirty Kicthen": "wjokapg",
  "Distribuidor": "jdlmeyx",
  "Dormitorio 1": "abknolm",
  "Dormitorio 2": "qlbyojo",
  "Dormitorio 3": "xxjpylj",
  "Dormitorio 4": "ylnboxm",
  "Dormitorio 5": "lxjgblw",
  "Dormitorio 6": "ojkbaex",
  "Dormitorio 7": "mjwkzoj",
  "Dormitorio 8": "exwnzaq",
  "Dormitorio 9": "gqgyajj",
  "Entrada": "kdoekya",
  "Escalera": "pxkdyge",
  "Fachada": "bjbwepm",
  "Garaje": "dxjnbzn",
  "General": "zowdemp",
  "Gimnasio": "najpwmn",
  "Grupo presion": "wjokayg",
  "Hamann": "jdlmejx",
  "Jardines": "abknopm",
  "Jardín": "ylnboxo",
  "Lavadero": "lxjgbqj",
  "Local": "ojkbaqg",
  "Oficina": "mjwkzqe",
  "Otros": "exwnzde",
  "Otros….": "gqgyaxq",
  "Pasillo": "kdoekal",
  "Pasillo Z.C": "pxkdyqg",
  "Patio": "bjbwedd",
  "Piscina": "dxjnbdy",
  "Piscina pequeña": "zowdeqy",
  "Porche": "najpwqp",
  "Portal": "wjokawe",
  "Resto Urbanización": "jdlmeap",
  "RITS": "abknoja",
  "Sala extraccion": "qlbyoqn",
  "Salón": "xxjpybn",
  "Sauna": "ylnbodo",
  "Show room": "lxjgbyj",
  "Sin definir": "ojkbamg",
  "Solarium": "mjwkzle",
  "Sotano Z.C": "exwnzle",
  "Tendedero": "gqgyamq",
  "Terraza": "kdoekpl",
  "Terraza 1": "pxkdyeg",
  "Terraza 2": "bjbwekd",
  "Terraza 3": "dxjnbyy",
  "Terraza 4": "zowdeay",
  "Terraza Salón": "najpwop",
  "Terraza Técnica": "wjokaxe",
  "Trastero": "jdlmekp",
  "Vestibulo Baja": "abknoga",
  "Vestibulo Garaje": "qlbyogn",
  "Vestibulo Primera": "xxjpyan",
  "Vestibulo Segunda": "ylnboao",
  "Vestidor": "lxjgbnj",
  "Vestuario": "ojkbang",
  "Vestíbulo": "mjwkzne",
  "Vestíbulo de entrada": "exwnzke",
  "Vinoteca": "gqgyabq",
  "Vivienda": "kdoeknl",
  "Vivienda General": "pxkdyjg",
  "Zona Comunes": "bjbwemd",
  "Zona infantil": "dxjnbgy",
  "Zona verde": "zowdeyy"
};

const CATEGORY_IDS = {
  "General defect": "poxnoeze",
  "Additional works": "ngadgobn",
  "Assessment": "qklwkgno",
  "Changes in planning": "mdjbdlyj",
  "Defect": "kqdxqpja",
  "Due-diligence": "doxaoykn",
  "Hindrance": "jqdgqkwx",
  "Hint": "qklwkgeo",
  "Inventory": "lmxpmybw",
  "Lack of preliminary work": "gwqowmaj",
  "Misgiving": "doxaoybn",
  "Note": "ngadgown",
  "Task": "qklwkgoo",
  "Warranty defect": "ogjzgnkx",
  "Remaining work": "gwqowbgj",
  "RFI": "bqjaqmbm",
  "Snag": "ngadgxjn",
  "Clean up": "jqdgqnlx",
  "Condition Schedule": "ogjzgngg",
  "Maintenance": "kqdxqnql",
  "Observation": "zxobxyxy",
  "Document": "wdjgdqde"
};

const PLANRADAR_CUSTOMER = '338607';
const PLANRADAR_PROJECT = '338609';
const PLANRADAR_BASE = 'https://planradar.com/api/v1';
const FIELD_ROOM = 'tffa50f6035291031e';
const FIELD_CATEGORY = 'tf1fb9ead060327190';
const FIELD_UNIT_ID = 'tf7324790b280bec08';
const FIELD_DESCRIPTION = 'tfa19c566730899fd7';
const FIELD_CONTACT_NAME = 'tf575950908d920cba';
const FIELD_CONTACT_EMAIL = 'tf59ea55900e072e16';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const secret = event.headers['x-form-secret'];
  if (secret !== process.env.FORM_SECRET) {
    return { statusCode: 403, body: 'Forbidden' };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const sanitize = (str) => String(str || '').replace(/<[^>]*>/g, '').trim().slice(0, 500);

  const roomText = sanitize(data.room);
  const categoryText = sanitize(data.category);
  const unitId = sanitize(data.unit_id);
  const description = sanitize(data.description);
  const contactName = sanitize(data.contact_name);
  const contactEmail = sanitize(data.contact_email);
  const contactPhone = sanitize(data.contact_phone);

  const roomId = ROOM_IDS[roomText] || null;
  const categoryId = CATEGORY_IDS[categoryText] || null;

  // Build PlanRadar ticket payload
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

  try {
    const res = await fetch(`${PLANRADAR_BASE}/${PLANRADAR_CUSTOMER}/projects/${PLANRADAR_PROJECT}/tickets?auth_token=${process.env.PLANRADAR_API_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ticketPayload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('PlanRadar error:', res.status, errText);
      return { statusCode: 502, body: 'PlanRadar API error: ' + res.status };
    }

    const json = await res.json();
    const ref = json.ticket?.reference || json.ticket?.id || 'DEF-' + Date.now().toString(36).toUpperCase();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, ref })
    };
  } catch (err) {
    console.error('Error:', err);
    return { statusCode: 500, body: 'Internal error' };
  }
};
