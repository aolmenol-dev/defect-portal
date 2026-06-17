const ROOM_IDS = {
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

  const payload = {
    unit_id:        sanitize(data.unit_id),
    room:           roomText,
    room_id:        ROOM_IDS[roomText] || null,
    category:       categoryText,
    category_id:    CATEGORY_IDS[categoryText] || null,
    priority:       sanitize(data.priority),
    description:    sanitize(data.description),
    contact_name:   sanitize(data.contact_name),
    contact_email:  sanitize(data.contact_email),
    contact_phone:  sanitize(data.contact_phone),
    submitted_at:   new Date().toISOString(),
  };

  const response = await fetch(process.env.WORKATO_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { statusCode: 502, body: 'Upstream error' };
  }

  const ref = 'DEF-' + Date.now().toString(36).toUpperCase();
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, ref }),
  };
};
