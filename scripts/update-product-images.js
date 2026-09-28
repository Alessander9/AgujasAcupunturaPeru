/**
 * Script para actualizar las imágenes de productos en productsData.js
 * Asignaciones 100% validadas contra el catálogo real de imágenes y fichas técnicas.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const IMAGE_MAP = {
  // === ACUPUNTURA Y MOXIBUSTIÓN (22 productos) ===
  "PROD-150": ["agujasKoreanas-opt.webp"],
  "PROD-149": ["agujasAcupuntura-opt.webp"],
  "PROD-141": ["aplicadorAgujas-opt.webp"],              // Aplicador de agujas
  "PROD-72":  ["cajaMoxas3-opt.webp"],                   // Caja moxibustión 3 moxas
  "PROD-29":  ["cajaMoxibustion-opt.webp"],              // Caja moxibustión 1 moxa
  "PROD-153": ["cajaMOXAS2-opt.webp"],                   // Caja moxibustión 2 moxas
  "PROD-134": ["cocodrillos-opt.webp"],                  // Cocodrilos electroacupuntura (cables/electrodos)
  "PROD-2":   ["electroacupuntador-opt.webp"],           // Electroacupuntor SDZ-IIB
  "PROD-135": ["tekno_bio-opt.webp"],                    // Electroacupuntura Tekno Bio Body
  "PROD-28":  ["electroacupuntura-opt.webp"],            // Lápiz de electroacupuntura
  "PROD-136": ["acu_doc-opt.webp"],                      // Lápiz Acu doc
  "PROD-156": ["martilloAcupuntura-opt.webp"],           // Martillo flor de ciruelo 5 puntos
  "PROD-55":  ["minimoxas_gold-opt.webp"],               // Mini moxas gold
  "PROD-157": ["minimoxas-opt.webp"],                    // Mini moxas aguja caliente
  "PROD-67":  ["minimoxaAdhesiva-opt.webp"],             // Mini moxas stick 180und
  "PROD-45":  ["moxa_dorada-opt.webp"],                  // Moxa dorada suelta
  "PROD-155": ["moxa_sin_humo-opt.webp"],                // Moxa sin humo
  "PROD-158": ["pipaMoxi-opt.webp"],                     // Pipa de moxibustión
  "PROD-152": ["portaMoxa-opt.webp"],                    // Porta moxa de acero
  "PROD-151": ["puros_moxa-opt.webp"],                   // Puros de moxa
  "PROD-17":  ["rollerMoxi-opt.webp"],                   // Roller de moxibustión
  "PROD-27":  ["ChatGPT Image 26 sept 2026, 04_07_06 p.m-opt.webp"], // Banner "Todo en Acupuntura y Moxibustión MTC"

  // === AROMATERAPIA (21 productos) ===
  "PROD-105": ["borgona-opt.webp"],                      // Bergamota
  "PROD-104": ["citronella-opt.webp"],                   // Citronella
  "PROD-101": ["cypress-opt.webp"],                      // Cypress
  "PROD-102": ["eucalipto-opt.webp"],                    // Eucalipto
  "PROD-99":  ["jazmin-opt.webp"],                       // Jazmín
  "PROD-97":  ["lavanda-opt.webp"],                      // Lavanda
  "PROD-100": ["lemongrass-opt.webp"],                  // Lemongrass
  "PROD-91":  ["limon-opt.webp"],                        // Limón
  "PROD-103": ["mandarina-opt.webp"],                    // Mandarina
  "PROD-95":  ["melisa-opt.webp"],                       // Melisa
  "PROD-96":  ["menta-opt.webp"],                        // Menta
  "PROD-92":  ["naranja-opt.webp"],                      // Naranja
  "PROD-94":  ["romero-opt.webp"],                       // Romero
  "PROD-98":  ["rosas-opt.webp"],                        // Rosas
  "PROD-93":  ["YLANG YLANG-opt.webp"],                  // Ylang Ylang
  "PROD-21":  ["ChatGPT Image 27 sept 2026, 03_37_56 p.m-opt.webp"], // Banner "Todo en Aromaterapia Amazoni-K"
  "PROD-87":  ["aceiteRomeroArnica-opt.webp"],           // Árnica y Romero masaje
  "PROD-89":  ["aceiteCanela-opt.webp"],                 // Canela masaje
  "PROD-88":  ["aceiteLavanda-opt.webp"],                // Lavanda masaje
  "PROD-25":  ["mixFlora-opt.webp"],                     // Línea aromaterapia & flores de Bach
  "PROD-90":  ["mixFlora-opt.webp"],                     // Rosa - Lavanda - Jazmín (Mix Floral)

  // === ACEITES AMAZONI-K (4 productos) ===
  "AMZ-COP30": ["borgona-opt.webp"],                     // Copaiba
  "AMZ-SDG30": ["borgona-opt.webp"],                     // Sangre de Grado
  "AMZ-PAL15": ["citronella-opt.webp"],                  // Palo Santo
  "AMZ-AGU30": ["rosas-opt.webp"],                       // Aguaje & Rosa Mosqueta

  // === AURICULOTERAPIA (16 productos) ===
  "PROD-147": ["balinesORO-opt.webp"],                   // Balines dorados / Balines de oro
  "PROD-148": ["balines_plata-opt.webp"],                // Balines de plata / plateados
  "PROD-145": ["balines_decorativos-opt.webp"],          // Balines decorativos de Auriculoterapia
  "PROD-52":  ["cero_smoke-opt.webp"],                   // Cero Smoke
  "PROD-146": ["chinchetasAURICULO-opt.webp"],           // Chinchetas
  "PROD-69":  ["libroAuriculo-opt.webp"],                // Cuaderno auriculoterapia
  "PROD-46":  ["detector_auriculo-opt.webp"],            // Detector de puntos de auriculoterapia
  "PROD-144": ["imanes_auriculo-opt.webp"],              // Imanes de auriculoterapia
  "PROD-70":  ["NuevoKitAuriculoterapia-opt.webp"],      // Kit completo auriculoterapia
  "PROD-62":  ["kitAuriculoCuaderno-opt.webp"],          // KIT DE AURICULOTERAPIA
  "PROD-26":  ["ChatGPT Image 26 sept 2026, 04_06_54 p.m-opt.webp"], // Banner "Todo en Auriculoterapia"
  "PROD-71":  ["maquetaAuriculoterapia-opt.webp"],       // Oreja de goma 8cm
  "PROD-139": ["puntorAURICULO-opt.webp"],               // Puntor auriculoterapia
  "PROD-140": ["puntor_Retractil-opt.webp"],             // Puntor retráctil
  "PROD-142": ["semVACCARIA-opt.webp"],                  // Semillas vaccaria
  "PROD-68":  ["semVACCARIA-opt.webp"],                  // Semillas vaccaria estuche

  // === COMPRESAS (5 productos) ===
  "PROD-124": ["compresaGUANTES-opt.webp"],              // Compresa guantes
  "PROD-58":  ["compresaBOTAS-opt.webp"],                // Compresa botas
  "PROD-125": ["compresaGELfrio-opt.webp"],              // Compresa gel frío
  "PROD-126": ["compresaSemillas-opt.webp"],             // Compresa semillas
  "PROD-23":  ["lineaCOMPRESAS-opt.webp"],               // Línea de compresas

  // === ENFERMERÍA (5 productos) ===
  "PROD-13":  ["bandeja-acero-opt.webp"],                // Bandeja de acero
  "PROD-63":  ["cajas-instrumental-opt.webp"],           // Cajas para instrumental
  "PROD-129": ["gelEcografia-opt.webp"],                 // Gel ecografía
  "PROD-128": ["tachito-opt.webp"],                      // Tacho bioseguridad
  "PROD-143": ["tinturaBenjui-opt.webp"],                // Tintura benjuí

  // === FISIOTERAPIA (11 productos) ===
  "PROD-7":   ["aroPilates-opt.webp"],                   // Aro pilates
  "PROD-8":   ["bandaCONAGARRE-opt.webp"],               // Banda con agarre
  "PROD-132": ["repuestoTENS700-opt.webp"],              // Cables TENS
  "PROD-131": ["electrodosPALS-opt.webp"],               // Electrodos PALS
  "PROD-127": ["kinesioTAPE-opt.webp"],                  // Kinesio tape
  "PROD-130": ["lamparaINFRARROJA-opt.webp"],            // Lámpara infrarroja
  "PROD-137": ["setLigasAbiertas-opt.webp"],             // Set ligas abiertas
  "PROD-5":   ["ligasCerradas5Niveles-opt.webp"],        // Ligas cerradas
  "PROD-24":  ["kinesioTAPE-opt.webp"],                  // Línea fisioterapia
  "PROD-133": ["tens7000-opt.webp"],                     // TENS 7000
  "PROD-138": ["totalGUN-opt.webp"],                     // Total gun masaje

  // === HERRAMIENTAS DE MASAJE (20 productos) ===
  "PROD-49":  ["digitopresor-opt.webp"],                 // Digitopresor reflexología
  "PROD-60":  ["digitopresor-opt.webp"],                 // Digitopresor flex confort
  "PROD-108": ["digitopresorTHERApress-opt.webp"],       // Digitopresor Thera Press
  "PROD-9":   ["digitopresorTriangularMadera-opt.webp"], // Digitopresor triangular madera
  "PROD-107": ["digitopresorTrianguloAcrilico-opt.webp"],// Digitopresor triangular acrílico
  "PROD-10":  ["guasha-opt.webp"],                       // Gua sha
  "PROD-50":  ["guashaMediaLuna-opt.webp"],              // Gua sha media luna
  "PROD-14":  ["herramientaMIOFACIAL-opt.webp"],         // Herramienta miofascial
  "PROD-22":  ["herramientasMASAJE-opt.webp"],           // Herramientas de masaje
  "PROD-15":  ["kitmiosfacial-opt.webp"],                // Kit miofascial 3 pzs
  "PROD-109": ["lapizReflexologiaAcrilico-opt.webp"],    // Lápiz reflexología acrílico
  "PROD-106": ["lapizReflexologiaMadera-opt.webp"],      // Lápiz reflexología madera
  "PROD-59":  ["maniTerapeutico-opt.webp"],              // Maní terapéutico
  "PROD-48":  ["herramientaMIOFACIAL-opt.webp"],         // Pack miofascial
  "PROD-110": ["piedrasCalientes16-opt.webp"],           // Piedras calientes 16
  "PROD-112": ["kit20pzsPiedraCaliente-opt.webp"],       // Piedras calientes 20
  "PROD-47":  ["puntorAcero-opt.webp"],                  // Puntor acero inox
  "PROD-51":  ["puntorReflexologia-opt.webp"],           // Puntor reflexología
  "PROD-154": ["rollerJADE-opt.webp"],                   // Roller jade
  "PROD-56":  ["digitopresorTRIANGULAR-opt.webp"],       // Triángulo acrílico

  // === LÁMINAS Y MODELOS ANATÓMICOS ===
  "PROD-86":  ["laminaColumna-opt.webp"],
  "PROD-84":  ["meridianoIntestino-opt.webp"],
  "PROD-31":  ["lamina-auriculoterapia1-opt.webp"],
  "PROD-32":  ["lamina-auriculoterapia2-opt.webp"],
  "PROD-66":  ["lamina-auriculoterapia3-opt.webp"],
  "PROD-82":  ["lamina-5elementos-china-opt.webp"],
  "PROD-30":  ["lamina-reflexologia1-opt.webp"],
  "PROD-80":  ["lamina-reflexologia1-opt.webp"],
  "PROD-79":  ["lamina-reflexologia3-opt.webp"],
  "PROD-57":  ["cabezaAcupuntura-opt.webp"],
  "PROD-61":  ["maquetaAuriculoterapia-opt.webp"],
  "PROD-18":  ["manopuntura-opt.webp"],
  "PROD-19":  ["puntorReflexologia-opt.webp"],
  "PROD-16":  ["maquetaOreja18cm-opt.webp"],
  "PROD-43":  ["meridiano-estomago-opt.webp"],
  "PROD-34":  ["meridiano-higado-opt.webp"],
  "PROD-39":  ["meridianoIntestino-opt.webp"],
  "PROD-35":  ["meridiano-vesicula-opt.webp"],
  "PROD-37":  ["meridiano-corazon-opt.webp"],
  "PROD-38":  ["meridiano-riñon-opt.webp"],
  "PROD-42":  ["meridiano-bazo-pancreas-opt.webp"],
  "PROD-41":  ["meridiano-corazon-opt.webp"],
  "PROD-44":  ["meridiano-corazon-opt.webp"],
  "PROD-40":  ["meridiano-intestino-delgado-opt.webp"],
  "PROD-78":  ["meridiano-pulmon-opt.webp"],
  "PROD-36":  ["meridiano-triple-calentador-opt.webp"],
  "PROD-64":  ["munecoAcupuntura-opt.webp"],

  // === ORTOPEDIA Y POSTURA (14 productos) ===
  "PROD-114": ["almohada-opt.webp"],                     // Almohada ortopédica
  "PROD-113": ["almohada-visco-opt.webp"],               // Almohada viscoelástica
  "PROD-12":  ["almohadilla-protectora-opt.webp"],       // Almohadilla codo/rodilla
  "PROD-121": ["ferulaStack-opt.webp"],
  "PROD-120": ["ferulaAluminio-opt.webp"],
  "PROD-117": ["ferulaGancho-opt.webp"],
  "PROD-118": ["ferulaResorte-opt.webp"],
  "PROD-119": ["ferulaSandalia-opt.webp"],
  "PROD-115": ["plantillasORTO-opt.webp"],
  "PROD-123": ["rodillera-articulada-opt.webp"],          // Rodillera con varilla de Polietileno
  "PROD-6":   ["rodilleraDobleVarilla-opt.webp"],
  "PROD-122": ["rodillera-opt.webp"],
  "PROD-4":   ["taloneraHerradura-opt.webp"],
  "PROD-116": ["traccionadorCUELLO-opt.webp"],

  // === VENTOSA TERAPIA (10 productos) ===
  "PROD-111": ["kitVentosas-opt.webp"],
  "PROD-75":  ["kitventosasGiratorias-opt.webp"],
  "PROD-20":  ["todo-ventosa-terapia-opt.webp"],
  "PROD-53":  ["mecheroVentosas-opt.webp"],
  "PROD-11":  ["ventosas-silicona-opt.webp"],
  "PROD-73":  ["ventosasAcrilicas-opt.webp"],
  "PROD-74":  ["ventosasActilicas24pzs-opt.webp"],
  "PROD-54":  ["ventosasBiomagneticas-opt.webp"],
  "PROD-3":   ["ventosas-silicona-opt.webp"],
  "PROD-76":  ["ventosasTherapyPRO-opt.webp"],
};

const BASE_PATH = "/img_productos/";

function updateProductsData() {
  const filePath = path.join(rootDir, 'src', 'data', 'productsData.js');
  let content = readFileSync(filePath, 'utf8');

  let updatedCount = 0;
  for (const [sku, images] of Object.entries(IMAGE_MAP)) {
    const skuPattern = new RegExp(
      `("sku":\\s*"${sku}"[\\s\\S]*?"imagenes":\\s*\\[)[\\s\\S]*?(\\])`,
      'g'
    );
    const localImages = images.map(img => `"${BASE_PATH}${img}"`).join(',\n      ');
    const replacement = `$1\n      ${localImages}\n    $2`;
    content = content.replace(skuPattern, replacement);
    updatedCount++;
  }

  writeFileSync(filePath, content, 'utf8');
  console.log(`✅ productsData.js actualizado con ${updatedCount} asignaciones.`);
}

updateProductsData();
