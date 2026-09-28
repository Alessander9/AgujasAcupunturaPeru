if (window.self !== window.top) {
    document.body.classList.add("embed-mode");
}

        const WA_NUMBER = "51930830427";
        const PAGE_SIZE = 12;
        const state = { search: "", category: "todas", page: 1 };
        const qs = (s) => document.querySelector(s);
        const qsa = (s) => Array.from(document.querySelectorAll(s));
        const els = {
            searchInput: qs("#searchInput"),
            categorySelect: qs("#categorySelect"),
            activePills: qs("#activePills"),
            summaryPill: qs("#summaryPill"),
            resultsTitle: qs("#resultsTitle"),
            resultsSubtitle: qs("#resultsSubtitle"),
            productsGrid: qs("#productsGrid"),
            emptyState: qs("#emptyState"),
            pagination: qs("#pagination"),
            modal: qs("#productModal"),
            closeModalBtn: qs("#closeModalBtn"),
            modalImg: qs("#modalImg"),
            modalTitle: qs("#modalTitle"),
            modalPrice: qs("#modalPrice"),
            modalSummary: qs("#modalSummary"),
            modalCategory: qs("#modalCategory"),
            modalBuy: qs("#modalBuy"),
            modalViewImage: qs("#modalViewImage"),
            openImageLightboxBtn: qs("#openImageLightboxBtn"),
            modalChips: qs("#modalChips"),
            modalHighlightsWrap: qs("#modalHighlightsWrap"),
            modalHighlights: qs("#modalHighlights"),
            modalDetails: qs("#modalDetails"),
            imageLightbox: qs("#imageLightbox"),
            lightboxImg: qs("#lightboxImg"),
            closeImageLightboxBtn: qs("#closeImageLightboxBtn"),
        };
        const esc = (v) =>
            String(v  "").replace(
                /[&<>\"]/g,
                (m) =>
                    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m] || m,
            );
        const normalizeCategory = (cat) => {
            if (cat === "Laminas coleccionables y maquetas")
                return "Láminas coleccionables y maquetas";
            if (cat === "Ortopedia, plantillas y almohadas ortopedicas")
                return "Ortopedia, plantillas y almohadas ortopédicas";
            return cat;
        };
        function slugify(value) {
            return String(value || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
        }
        function productImageKey(value) {
            return slugify(value)
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
        }
        const PRODUCT_IMAGE_OVERRIDES_BY_NAME = {
            "Lamina de Auriculoterapia 1":
                "https://static.wixstatic.com/media/3c52e9_3c95e6d41c944b2da8dc9d4cf7d6ef9e~mv2.png",
            "Lamina de Auriculoterapia 2":
                "https://static.wixstatic.com/media/3c52e9_c6994db294984c3dbcae198f5c829a78~mv2.jpg",
            "Lamina de Auriculoterapia 3":
                "https://static.wixstatic.com/media/3c52e9_1ead92ad542749af9ff0aa93adc7e15d~mv2.png",
            "Lamina de Auriculoterapia 4":
                "https://static.wixstatic.com/media/3c52e9_b059a2f3ebf7449d94e6f2c63efbf611~mv2.png",
        };
        const PRODUCT_IMAGE_OVERRIDES = {
            "electroacupuntor-portatil-sdz-iib":
                "https://static.wixstatic.com/media/3c52e9_ad1325ebc6274841a2966f17888bbbbe~mv2.jpeg",
            "ventosas-faciales":
                "https://static.wixstatic.com/media/3c52e9_39ab85764d55436fa7dcf587d9ffaf17~mv2.avif",
            "talonera-en-herradura":
                "https://static.wixstatic.com/media/3c52e9_c491d2d29c2f4d379dd06d4ee6b37df4~mv2.avif",
            "ligas-cerradas":
                "https://static.wixstatic.com/media/3c52e9_18dc2d2deb204402a7f57e5f59526f37~mv2.avif",
            "rodillera-de-doble-varilla":
                "https://static.wixstatic.com/media/3c52e9_16d05d5953c146649173f4da02c531ab~mv2.avif",
            "aro-de-pilates":
                "https://static.wixstatic.com/media/3c52e9_c4c1cac15c6d4bebb464291c41d06b66~mv2.avif",
            "bandas-elasticas-con-agarre":
                "https://static.wixstatic.com/media/3c52e9_e392b712c3e249aa8f16c643797cafc2~mv2.avif",
            "digitopresor-triangular":
                "https://static.wixstatic.com/media/3c52e9_5d12f1573cfc48f4860327a6a66179b2~mv2.avif",
            "gua-sha":
                "https://static.wixstatic.com/media/3c52e9_d1be5464957e4702b0935b4b3a536d38~mv2.jpeg",
            "mini-ventosas-4-pzs":
                "https://static.wixstatic.com/media/3c52e9_64b67c925b5c46ccbe67fce3faff70d6~mv2.jpeg",
            "almohadilla-codo-rodilla":
                "https://static.wixstatic.com/media/3c52e9_47bb0309877943828b81328fa318fa7e~mv2.avif",
            "bandeja-de-acero":
                "https://static.wixstatic.com/media/3c52e9_6199445ff6a7452e801a4dcfd570c823~mv2.jpg",
            "herramienta-miofascial":
                "https://static.wixstatic.com/media/3c52e9_4e9355b069284827aea4ff2a49a58c4d~mv2.jpg",
            "kit-miofascial-x-3-pzs":
                "https://static.wixstatic.com/media/3c52e9_a6aa8d9858564896becbe257ed2dc026~mv2.jpeg",
            "maqueta-oreja-18-cm":
                "https://static.wixstatic.com/media/3c52e9_22a590aa8fc04e26b99412a26e4e30a7~mv2.jpeg",
            "roller-de-moxibustion":
                "https://static.wixstatic.com/media/3c52e9_6939ad69ddbb4ee78653d5696971cac6~mv2.jpeg",
            "maqueta-de-manopuntura":
                "https://static.wixstatic.com/media/3c52e9_30d60359d4854926940388d49d942a84~mv2.jpeg",
            "maqueta-de-reflexologia":
                "https://static.wixstatic.com/media/3c52e9_d6e7f92d85a44125a5023241125dba75~mv2.jpeg",
            "linea-de-ventosaterapia":
                "https://static.wixstatic.com/media/3c52e9_d6ad03bef883483f9a4c14e0081d068e~mv2.jpeg",
            "aceites-esenciales":
                "https://static.wixstatic.com/media/3c52e9_a0919f7fbbee45319d4ae03809ad4427~mv2.jpeg",
            "herramientas-de-masaje":
                "https://static.wixstatic.com/media/3c52e9_63402635f80241e0bcc5209a59d1f7f4~mv2.jpeg",
            "linea-de-compresas":
                "https://static.wixstatic.com/media/3c52e9_74af2a8c56ba4b0da3f4513adc6c66ed~mv2.jpeg",
            "linea-de-fisioterapia":
                "https://static.wixstatic.com/media/3c52e9_3bb20aea94854f0c965d0523a38da7fe~mv2.jpeg",
            "linea-de-aromaterapia-flores-de-bach":
                "https://static.wixstatic.com/media/3c52e9_09aefd954b594cdeba713362b66aebc5~mv2.jpeg",
            "linea-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_783b0e1a4f8e4fcbae8ed68821f27d33~mv2.jpeg",
            "todo-en-agujas-de-acupuntura-y-moxibustion":
                "https://static.wixstatic.com/media/3c52e9_779365ebdaa545eeb90b4f790fdfba81~mv2.jpeg",
            "lapiz-de-electroacupuntura":
                "https://static.wixstatic.com/media/3c52e9_cf54fd0413f04f4197423da07079fb3e~mv2.jpeg",
            "caja-de-moxibustion-1-moxa":
                "https://static.wixstatic.com/media/3c52e9_293f0279a3b24498b5e4e3e88883cb51~mv2.jpg",
            "lamina-de-reflexologia":
                "https://static.wixstatic.com/media/3c52e9_ba56c3e8ec884c8d8dead9ada6940275~mv2.png",
            "lamina-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_b059a2f3ebf7449d94e6f2c63efbf611~mv2.png",
            "lamina-de-auriculoterapia-2":
                "https://static.wixstatic.com/media/3c52e9_3c95e6d41c944b2da8dc9d4cf7d6ef9e~mv2.png",
            "lamina-de-auriculoterapia-3":
                "https://static.wixstatic.com/media/3c52e9_b059a2f3ebf7449d94e6f2c63efbf611~mv2.png",
            "lamina-auriculoterapia-topografica":
                "https://static.wixstatic.com/media/3c52e9_151567de3e09494b8702959595b10d91~mv2.png",
            "lamina-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_3c95e6d41c944b2da8dc9d4cf7d6ef9e~mv2.png",
            "meridiano-de-higado":
                "https://static.wixstatic.com/media/3c52e9_cc5b59f928ab490dad66356792537748~mv2.png",
            "meridiano-de-la-vesicula-biliar":
                "https://static.wixstatic.com/media/3c52e9_744c03be3f594a8b8f01282f5a0b3926~mv2.jpg",
            "meridiano-triple-recalentador":
                "https://static.wixstatic.com/media/3c52e9_333cad6f78ed4290b9ecb7961771ce20~mv2.jpg",
            "meridiano-de-maestro-del-corazon":
                "https://static.wixstatic.com/media/3c52e9_823f7fb63e3d4e1b88fee78606d441fb~mv2.jpg",
            "meridiano-de-riñón":
                "https://static.wixstatic.com/media/3c52e9_6814950b763d48efbd41841bfcec7993~mv2.png",
            "meridiano-de-la-vejiga":
                "https://static.wixstatic.com/media/3c52e9_15df88f598ae4814a7659d42b0632e61~mv2.png",
            "meridiano-del-intestino-delgado":
                "https://static.wixstatic.com/media/3c52e9_55f1e508a67648f182f075a8a9b0cfb8~mv2.png",
            "meridiano-del-corazon":
                "https://static.wixstatic.com/media/3c52e9_a4f9a041022543029d4847de540af3d5~mv2.png",
            "meridiano-del-corazon-version-2":
                "https://static.wixstatic.com/media/3c52e9_a4f9a041022543029d4847de540af3d5~mv2.png",
            "meridiano-del-bazo-pancreas":
                "https://static.wixstatic.com/media/3c52e9_c1415120323d47298186b03649154b1c~mv2.png",
            "meridiano-de-estomago":
                "https://static.wixstatic.com/media/3c52e9_ed86bef36e0742cc850b363b6a02a100~mv2.png",
            "moxa-dorada-suelta":
                "https://static.wixstatic.com/media/3c52e9_b1312da6f0b14a6982f7616b3963748e~mv2.jpeg",
            "detector-de-puntos-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_fffd5d8f178d4a29b522cc2c273629d1~mv2.jpg",
            "puntor-de-acero-inoxidable":
                "https://static.wixstatic.com/media/3c52e9_7d3dd92fe1d5439fadffd61bb154a02d~mv2.jpeg",
            "pack-miofascial":
                "https://static.wixstatic.com/media/3c52e9_ad8fcaa67d10491ea890a3e438f0c222~mv2.jpeg",
            "digitopresor-de-reflexologia":
                "https://static.wixstatic.com/media/3c52e9_7209e9093dd54da480c7e3ee8695007d~mv2.jpeg",
            "gua-sha-en-media-luna":
                "https://static.wixstatic.com/media/3c52e9_3423ce99e8154a2cb7bbd9ad542fac08~mv2.jpeg",
            "puntor-de-reflexologia":
                "https://static.wixstatic.com/media/3c52e9_82f320a6352f49f5b8e143e9a45b3a8b~mv2.jpeg",
            "cero-smoke":
                "https://static.wixstatic.com/media/3c52e9_53334333c4224c1386e9afddfcb0f977~mv2.jpg",
            "mechero-para-ventosas":
                "https://static.wixstatic.com/media/3c52e9_cb2a801edaa44ea28ed08e493e026d80~mv2.png",
            "ventosas-biomagneticas":
                "https://static.wixstatic.com/media/3c52e9_117afa1fa0f84a28a1734458ca2e959e~mv2.jpg",
            "mini-moxas-gold":
                "https://static.wixstatic.com/media/3c52e9_3dcf16427b0c4a5db8cc289a42456de8~mv2.webp",
            "triangulo-de-acrilico":
                "https://static.wixstatic.com/media/3c52e9_39b309ec8ec244d0a3c8b4bca8402b14~mv2.png",
            "maqueta-cabeza-de-acupuntura":
                "https://static.wixstatic.com/media/3c52e9_ea9c1fbe92b6447284104e4383e60712~mv2.png",
            "compresa-en-botas":
                "https://static.wixstatic.com/media/3c52e9_cc31283b922e49d491f78c51917c759b~mv2.png",
            "mani-terapeutico":
                "https://static.wixstatic.com/media/3c52e9_60dbdbca43ea440d9b0b2deb69a31c51~mv2.png",
            "digitopresor-flex-confort":
                "https://static.wixstatic.com/media/3c52e9_c91dd57415084bdab43da5fe2cb75cbd~mv2.png",
            "maqueta-de-auriculoterapia-12-cm":
                "https://static.wixstatic.com/media/3c52e9_5a6eadd6459c449184c3caec27680030~mv2.png",
            "kit-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_ce9ee9245f1249b284bc14ba49c50fae~mv2.png",
            "cajas-para-instrumental":
                "https://static.wixstatic.com/media/3c52e9_a2110121caf44ff197777dc6495aeb82~mv2.jpg",
            "muneco-acupuntura-de-50-cm":
                "https://static.wixstatic.com/media/3c52e9_2d1e27ba57ef4f4899004181de33f149~mv2.png",
            "lamina-auriculoterapia-topografica":
                "https://static.wixstatic.com/media/3c52e9_151567de3e09494b8702959595b10d91~mv2.png",
            "mini-moxas-stick-180-und":
                "https://static.wixstatic.com/media/3c52e9_bf4ff6c5838f468e87fd08aeb1569df3~mv2.png",
            "semillas-de-vaccaria":
                "https://static.wixstatic.com/media/3c52e9_c6c4066b36034422bab93294f63db918~mv2.png",
            "semilla-de-vaccaria":
                "https://static.wixstatic.com/media/3c52e9_c6c4066b36034422bab93294f63db918~mv2.png",
            "cuaderno-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_15a4719dc9364b4cb2bd9aa02eeed93d~mv2.jpg",
            "kit-completo-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_2e7b42b9d9de4e6195084a0e7db7ddd0~mv2.jpg",
            "oreja-de-goma-de-8-cm":
                "https://static.wixstatic.com/media/3c52e9_62f9aab4b7574276a9e5a9de14be962f~mv2.jpg",
            "caja-de-moxibustion-3-moxas":
                "https://static.wixstatic.com/media/3c52e9_43e5c254c6d64439b1f4640e10d2ee96~mv2.png",
            "ventosas-acrilicas-12-pzs":
                "https://static.wixstatic.com/media/3c52e9_468d7dd47d1147b182bcdbf7cacbccd9~mv2.jpg",
            "ventosas-acrilicas-24-pzs":
                "https://static.wixstatic.com/media/3c52e9_c1de6c522ed94b79b5d09a4e1cc9c3fa~mv2.png",
            "kit-ventosas-giratorias-5pzs":
                "https://static.wixstatic.com/media/3c52e9_13dbf612ed4f4c69b01dc5988c1445fe~mv2.png",
            "ventosas-therapy-pro":
                "https://static.wixstatic.com/media/3c52e9_3ebf19f2cbf04071ab694695a5862cda~mv2.png",
            "auriculoterapia-china":
                "https://static.wixstatic.com/media/3c52e9_98c595a49fc840b9a96fa741b3fab1c3~mv2.png",
            "meridiano-del-pulmon":
                "https://static.wixstatic.com/media/3c52e9_3db2cbeef166456c8d331eaa8fe3203f~mv2.png",
            "lamina-reflexologia-podal-3d":
                "https://static.wixstatic.com/media/3c52e9_1e2e6c3fcb064104a3dfc845a4680dbc~mv2.png",
            "lamina-de-reflexologia-2":
                "https://static.wixstatic.com/media/3c52e9_4445cec75372412da0e2c03a50eab769~mv2.png",
            "lamina-de-los-5-elementos":
                "https://static.wixstatic.com/media/3c52e9_77c9cd0c1d064edd9ff6a83a15b7b6d2~mv2.png",
            "intestino-grueso":
                "https://static.wixstatic.com/media/3c52e9_f1369f9ed29f441b87d9b1194e8c6f4f~mv2.png",
            "columna-vertebral":
                "https://static.wixstatic.com/media/3c52e9_255621609035455bbfd74d40d966bdd9~mv2.png",
            "árnica-y-romero-aceite-para-masaje":
                "https://static.wixstatic.com/media/3c52e9_39d4d75e57aa4ce3a6320805bec3c50d~mv2.png",
            "lavanda-aceite-para-masajes":
                "https://static.wixstatic.com/media/3c52e9_749805bd29e246488e71571cccffa0cd~mv2.png",
            "canela-aceite-para-masaje":
                "https://static.wixstatic.com/media/3c52e9_fa60bb9c0d97417688f3664aab2b8a25~mv2.png",
            "rosa-lavanda-jazmin-mix-floral-aceite-para-masaje":
                "https://static.wixstatic.com/media/3c52e9_3b0c1b03d33b4343b007a52d52eee3c7~mv2.png",
            "aceite-esencial-de-limon":
                "https://static.wixstatic.com/media/3c52e9_a23f58ad431141d4a694e33cdb010347~mv2.png",
            "aceite-esencial-de-naranja":
                "https://static.wixstatic.com/media/3c52e9_9662f90de6a74e07992b46b47546e783~mv2.png",
            "aceite-esencial-de-ylang-ylang":
                "https://static.wixstatic.com/media/3c52e9_dfa9550d55824b6eb230742694789efc~mv2.png",
            "aceite-esencial-de-romero":
                "https://static.wixstatic.com/media/3c52e9_e6d6721030994e13a3561cb496276780~mv2.png",
            "aceite-esencial-de-melissa":
                "https://static.wixstatic.com/media/3c52e9_ff15aef63630427ea715b165e95a0efe~mv2.png",
            "aceite-esencial-de-menta":
                "https://static.wixstatic.com/media/3c52e9_5010b2b228d948e58e08d5725084f759~mv2.png",
            "aceite-esencial-de-lavanda":
                "https://static.wixstatic.com/media/3c52e9_7b310f5f034140f29b2e43d33c5bcaf3~mv2.png",
            "aceite-esencial-de-rosas":
                "https://static.wixstatic.com/media/3c52e9_e37adedbe5da47168e132226271b48d6~mv2.png",
            "aceite-esencial-de-jazmin":
                "https://static.wixstatic.com/media/3c52e9_e37adedbe5da47168e132226271b48d6~mv2.png",
            "aceite-esencial-de-lemongrass":
                "https://static.wixstatic.com/media/3c52e9_4371560f52cd4b879538a1422b1a196f~mv2.jpeg",
            "aceite-esencial-de-cypress":
                "https://static.wixstatic.com/media/3c52e9_18c9d7b120c447a09167da7c114276bd~mv2.png",
            "aceite-esencial-de-eucalipto":
                "https://static.wixstatic.com/media/3c52e9_55d79eaf04b6435d8cbf71d75d5633f6~mv2.jpeg",
            "aceite-esencial-de-mandarina":
                "https://static.wixstatic.com/media/3c52e9_0108b1205326497bae2b1f2d67871d24~mv2.png",
            "aceite-esencial-de-citronella":
                "https://static.wixstatic.com/media/3c52e9_432624a836aa4775b0d1de5bb20373fd~mv2.png",
            "aceite-esencial-de-bergamota":
                "https://static.wixstatic.com/media/3c52e9_73130e9a978e4105aef1a06aebf71859~mv2.png",
            "lapiz-de-reflexologia":
                "https://static.wixstatic.com/media/3c52e9_2fa285fbf77c4a1ba631fb3b0328182c~mv2.png",
            "digitopresor-triangular-acrilico":
                "https://static.wixstatic.com/media/3c52e9_7bd2ea4c630a4ac7bdfccf4d888e2a03~mv2.png",
            "digitopresor-thera-press":
                "https://static.wixstatic.com/media/3c52e9_dcfc2ad750bd4a96959d1c1926e38981~mv2.png",
            "lapiz-digitopresor-de-reflexologia-acrilico":
                "https://static.wixstatic.com/media/3c52e9_5f842c952f6740a5a4d0744968b73dc0~mv2.png",
            "piedras-calientes-x16u":
                "https://static.wixstatic.com/media/3c52e9_4559965aba494016add512a8a5f5caad~mv2.png",
            "kit-de-ventosas-de-vidrio":
                "https://static.wixstatic.com/media/3c52e9_a175e9de61d447219d526cbbdf030e6e~mv2.png",
            "piedras-calientes-20-pzs":
                "https://static.wixstatic.com/media/3c52e9_f52c636332e44f3186806b8fac8bdf2e~mv2.png",
            "plantilla-de-memory-foam":
                "https://static.wixstatic.com/media/3c52e9_67e4a81aa9444ed2934e643fbc18ebca~mv2.png",
            "almohada-viscoelastica":
                "https://static.wixstatic.com/media/3c52e9_e73e2b3b1c0843869ca50f2c9c82f60e~mv2.png",
            "almohada-ortopedica-con-doble-curva":
                "https://static.wixstatic.com/media/3c52e9_484ec5dc64f44693a72e5866f5b8ffe9~mv2.png",
            "traccionador-cervical":
                "https://static.wixstatic.com/media/3c52e9_b518f4288bda45c79ff4ccdfd2148fa7~mv2.png",
            "ferula-en-gancho":
                "https://static.wixstatic.com/media/3c52e9_725e74bed033434da86859be48a1c91a~mv2.png",
            "ferula-en-sandalia":
                "https://static.wixstatic.com/media/3c52e9_c44987bdeb5440548f692ddee51bb330~mv2.png",
            "ferula-aluminio-4-varillas":
                "https://static.wixstatic.com/media/3c52e9_64109f7722b2462ca992fbe75d32a706~mv2.png",
            "ferula-stack":
                "https://static.wixstatic.com/media/3c52e9_913e28f0bf754989bde87585821b2f13~mv2.png",
            "rodillera-de-varilla":
                "https://static.wixstatic.com/media/3c52e9_0776435acc014e7e889a3f09b62c4da5~mv2.png",
            "ferula-en-resorte":
                "https://static.wixstatic.com/media/3c52e9_6e6ec531adfd42399e46d9719d656603~mv2.png",
            "rodillera-con-varilla-de-polietileno":
                "https://static.wixstatic.com/media/3c52e9_8bbe69ac3f024c07a0e216f30011d70e~mv2.png",
            "compresa-de-semillas-modelo-guantes":
                "https://static.wixstatic.com/media/3c52e9_efde39c207e24f2dbbe6ad007229ab90~mv2.png",
            "compresas-de-gel-frias":
                "https://static.wixstatic.com/media/3c52e9_926f4e267ea9477a98df2558b6c155c8~mv2.jpeg",
            "compresas-de-semillas":
                "https://static.wixstatic.com/media/3c52e9_44624f6058b441eeb09520e4cc48c70d~mv2.png",
            "kinesio-tape":
                "https://static.wixstatic.com/media/3c52e9_982d2a65bcc544d8a547be049ac63153~mv2.png",
            "tacho-de-bioseguridad":
                "https://static.wixstatic.com/media/3c52e9_5a677d8718da4e96a1b79715d12bd680~mv2.png",
            "gel-de-ecografia":
                "https://static.wixstatic.com/media/3c52e9_91d7b2212d85462ea1bbc5b171577113~mv2.png",
            "lampara-infrarroja":
                "https://static.wixstatic.com/media/3c52e9_26b636781e0f4793a872db4cd5d93478~mv2.png",
            "electrodos-5x9-pals":
                "https://static.wixstatic.com/media/3c52e9_26d353ed12064ea7a5b1d7763bfdf3d7~mv2.png",
            "cables-para-tens-7000":
                "https://static.wixstatic.com/media/3c52e9_b09c03656db547a4a01a85a11a8c3621~mv2.png",
            "tens-7000":
                "https://static.wixstatic.com/media/3c52e9_95a2e2b511b74535a59e2b7f720d0807~mv2.png",
            "cocodrilos-de-electroacupuntura":
                "https://static.wixstatic.com/media/3c52e9_8f60b09dfacc44aba01c8ce5d46cc7ab~mv2.png",
            "electroacupuntura-tekno-bio-body":
                "https://static.wixstatic.com/media/3c52e9_a4fe70eb7dc946bc9bab5f03ec89e323~mv2.png",
            "lapiz-electroacupuntor-acu-doc":
                "https://static.wixstatic.com/media/3c52e9_0589d98dbc8747ff854e6e609299d9fd~mv2.jpeg",
            "ligas-abiertas-x3":
                "https://static.wixstatic.com/media/3c52e9_4e5170c00e4e461aa4c32d5f45bd8733~mv2.png",
            "total-gun-pistola-percutora":
                "https://static.wixstatic.com/media/3c52e9_7bf1831be2d64467b8664e8174d7a8e6~mv2.png",
            "puntor-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_07a84154690649289124507877d42506~mv2.png",
            "puntor-retractil":
                "https://static.wixstatic.com/media/3c52e9_e2f88fc0d112437b93343cdf5c5c5347~mv2.png",
            "aplicador-de-agujas":
                "https://static.wixstatic.com/media/3c52e9_9d5b831eb52446b9bbf33a7f3105de12~mv2.png",
            "semillas-de-vaccaria":
                "https://static.wixstatic.com/media/3c52e9_2f36a2c1d65f43fe926768ddc3db4fdd~mv2.png",
            "semilla-de-vaccaria":
                "https://static.wixstatic.com/media/3c52e9_2f36a2c1d65f43fe926768ddc3db4fdd~mv2.png",
            "balines-decorativos-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_6c320e329f18445bacb08e11471717ad~mv2.png",
            "imanes-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_148f654b9b284bab8cb5531c708e5c22~mv2.png",
            "chinchetas-para-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_6b5670b0d26348a9ad005c36b06a4847~mv2.png",
            "balines-de-oro":
                "https://static.wixstatic.com/media/3c52e9_c6c4066b36034422bab93294f63db918~mv2.png",
            "agujas-para-acupuntura":
                "https://static.wixstatic.com/media/3c52e9_841a810757b44485a864a8fa5d7b3a09~mv2.png",
            "agujas-koreanas-x-caja-de-500-und":
                "https://static.wixstatic.com/media/3c52e9_f88f872c49404deea019412629bdde2a~mv2.png",
            "tintura-de-benjui":
                "https://static.wixstatic.com/media/3c52e9_c19593023465489da9d0f7d0f33739dc~mv2.png",
            "caja-de-moxibustion-2-moxas":
                "https://static.wixstatic.com/media/3c52e9_0989450d842441f89a8df69b15659e23~mv2.png",
            "porta-moxa-de-acero-inoxidable":
                "https://static.wixstatic.com/media/3c52e9_66a2e7884d494deeb3ab8540e9297619~mv2.png",
            "roller-jade":
                "https://static.wixstatic.com/media/3c52e9_1aa0e179bcaa4e2c8b7fcb8b479a9ebc~mv2.png",
            "pipa-de-moxibustion":
                "https://static.wixstatic.com/media/3c52e9_7b027a1842b04a7e8fe0e46963a28b22~mv2.png",
            "mini-moxas-para-aguja-caliente":
                "https://static.wixstatic.com/media/3c52e9_ec42c1a081824a7382e3618a9f4425f4~mv2.png",
            "moxa-sin-humo":
                "https://static.wixstatic.com/media/3c52e9_7d7dbde83c6745ceade542418eb60994~mv2.jpeg",
            "martillo-de-5-puntos":
                "https://static.wixstatic.com/media/3c52e9_52439e941359466f9d9290e042d2d2b1~mv2.png",
            "balines-de-plata":
                "https://static.wixstatic.com/media/3c52e9_6ebe207f317f4fde8fdb901881fdb2dd~mv2.png",
            "puros-de-moxa":
                "https://static.wixstatic.com/media/3c52e9_51c4b3381d004b818426b8cc5b21e8e9~mv2.png",
        };
        const PRODUCT_MEDIA_CLASS_OVERRIDES = {
            "aceite-esencial-de-eucalipto": "media-fit-centered",
            "aceite-esencial-de-lemongrass": "media-fit-centered",
        };
        const PRODUCT_SECONDARY_IMAGE_OVERRIDES = {
            "árnica-y-romero-aceite-para-masaje":
                "https://static.wixstatic.com/media/3c52e9_e1fdf0bbad7e40889b35a2032e618795~mv2.png",
            "lavanda-aceite-para-masajes":
                "https://static.wixstatic.com/media/3c52e9_3c78a6b099cd46e1bc0c0635e0949161~mv2.png",
            "canela-aceite-para-masaje":
                "https://static.wixstatic.com/media/3c52e9_550f9aacb1bc479d860e42a865d15095~mv2.png",
            "rosa-lavanda-jazmin-mix-floral-aceite-para-masaje":
                "https://static.wixstatic.com/media/3c52e9_3c78a6b099cd46e1bc0c0635e0949161~mv2.png",
            "aceite-esencial-de-limon":
                "https://static.wixstatic.com/media/3c52e9_79154fb5ee654019b042c1719b0eda95~mv2.png",
            "aceite-esencial-de-naranja":
                "https://static.wixstatic.com/media/3c52e9_75cfc4797e57422e8a783b0b56b385e1~mv2.png",
            "aceite-esencial-de-ylang-ylang":
                "https://static.wixstatic.com/media/3c52e9_0a8ad05701624e1ab5099f3bf8f9d953~mv2.png",
            "aceite-esencial-de-romero":
                "https://static.wixstatic.com/media/3c52e9_6f021977b25140968d740c3e310a651d~mv2.png",
            "aceite-esencial-de-melissa":
                "https://static.wixstatic.com/media/3c52e9_151241b1a8ec4bff8109f09c75bd8fa4~mv2.png",
            "aceite-esencial-de-menta":
                "https://static.wixstatic.com/media/3c52e9_4e1fd1b2085d44baa0c78573acd411a5~mv2.png",
            "aceite-esencial-de-lavanda":
                "https://static.wixstatic.com/media/3c52e9_3aace803d8bd4287b59e8854d172cb42~mv2.png",
            "aceite-esencial-de-rosas":
                "https://static.wixstatic.com/media/3c52e9_e390f71c4d4b49f8a0616e9867653d8b~mv2.png",
            "aceite-esencial-de-lemongrass":
                "https://static.wixstatic.com/media/3c52e9_785fbfb6d3fd4c0994046b39ff4bdd21~mv2.png",
            "aceite-esencial-de-cypress":
                "https://static.wixstatic.com/media/3c52e9_26d3e80a4fa349189925724f45689a56~mv2.jpeg",
            "aceite-esencial-de-eucalipto":
                "https://static.wixstatic.com/media/3c52e9_ceb45e30565b4698ad9434f943c0c7fc~mv2.png",
            "aceite-esencial-de-mandarina":
                "https://static.wixstatic.com/media/3c52e9_59e50b076d7a44b78758dddf8e1bc6c0~mv2.jpeg",
            "aceite-esencial-de-citronella":
                "https://static.wixstatic.com/media/3c52e9_3f9c824f633b4446a4ef40e673824e31~mv2.jpeg",
            "aceite-esencial-de-bergamota":
                "https://static.wixstatic.com/media/3c52e9_a360ee931cc04c908dddbdcdcb816c50~mv2.png",
            "aro-de-pilates":
                "https://static.wixstatic.com/media/3c52e9_39b17289411d467c8604f86f9a0a0191~mv2.avif",
            "ferula-en-sandalia":
                "https://static.wixstatic.com/media/3c52e9_2e8c644d097c408f933b92abf352b618~mv2.png",
            "compresas-de-gel-frias":
                "https://static.wixstatic.com/media/3c52e9_45dd445645aa4b4b8f45f1e8519e1c09~mv2.png",
            "lapiz-electroacupuntor-acu-doc":
                "https://static.wixstatic.com/media/3c52e9_f61b883385b94032bc8b55df3f6ed248~mv2.png",
            "balines-decorativos-de-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_83fcdc6e34984f91ab0620973837ce42~mv2.jpg",
            "chinchetas-para-auriculoterapia":
                "https://static.wixstatic.com/media/3c52e9_76670e92247f4f1cb9313b75cd7acec2~mv2.png",
            "agujas-koreanas-x-caja-de-500-und":
                "https://static.wixstatic.com/media/3c52e9_c94ee5d4e22b452daeab116fe8304c91~mv2.png",
            "roller-jade":
                "https://static.wixstatic.com/media/3c52e9_ce799c51d65c4692a748fed7a179fa42~mv2.png",
            "mini-moxas-para-aguja-caliente":
                "https://static.wixstatic.com/media/3c52e9_a044585b3a2643fdb5ed2c6c326b358a~mv2.png",
            "martillo-de-5-puntos":
                "https://static.wixstatic.com/media/3c52e9_4c045f60c67245c99c02b07436e1d253~mv2.png",
        };
        function imageOverrideForProduct(product) {
            const exactName = String(product.nombre || "").trim();
            if (PRODUCT_IMAGE_OVERRIDES_BY_NAME[exactName]) {
                return PRODUCT_IMAGE_OVERRIDES_BY_NAME[exactName];
            }
            const nameKey = productImageKey(exactName);
            if (PRODUCT_IMAGE_OVERRIDES[nameKey]) {
                return PRODUCT_IMAGE_OVERRIDES[nameKey];
            }
            const slugKey = productImageKey(product.slug || "");
            return PRODUCT_IMAGE_OVERRIDES[slugKey] || "";
        }
        function mediaClassOverrideForProduct(product) {
            const exactNameKey = productImageKey(product.nombre || "");
            if (PRODUCT_MEDIA_CLASS_OVERRIDES[exactNameKey]) {
                return PRODUCT_MEDIA_CLASS_OVERRIDES[exactNameKey];
            }
            const slugKey = productImageKey(product.slug || "");
            return PRODUCT_MEDIA_CLASS_OVERRIDES[slugKey] || "";
        }
        function hoverImageOverrideForProduct(product) {
            const key = productImageKey(product.slug || product.nombre || "");
            return PRODUCT_SECONDARY_IMAGE_OVERRIDES[key] || "";
        }
        function imageForCategory(cat) {
            const c = slugify(cat);
            if (c.includes("acupuntura"))
                return "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("ventosa"))
                return "https://images.unsplash.com/photo-1611073616763-a4e6ce78b79e?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("fisioterapia"))
                return "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("enfermer"))
                return "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("aromaterapia"))
                return "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("ortopedia"))
                return "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("laminas"))
                return "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("masaje"))
                return "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=1200&q=80";
            if (c.includes("compresas"))
                return "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80";
            return "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80";
        }
        function arrayFrom(value) {
            if (Array.isArray(value)) return value;
            if (value === null || value === undefined || value === "") return [];
            return [value];
        }
        const PRODUCT_MODAL_DESCRIPTION_RAW = String.raw`
PRODUCTO:
Electroacupuntor Portátil SDZ-IIB

DESCRIPCION:
 SDZ-IIB Electroacupuntura Portátil 
Estimulación nerviosa y muscular en un solo equipo

5

El SDZ-IIB es el instrumento ideal para profesionales que buscan precisión, comodidad y resultados efectivos en sus tratamientos de electroacupuntura.

 3 formas de onda
 3 tipos de pulsaciones
 2 salidas independientes (permite trabajar varios puntos simultáneamente)
 Pantalla digital de fácil lectura
 Incluye cocodrilos
 Incluye parches TENS
 Portátil y práctico

? Ideal para tratamientos de dolor
? Rehabilitación muscular
? Terapias complementarias
? Atención en consultorio o a domicilio

? Compacto, eficiente y fácil de usar
Tu mejor opción en electroacupuntura portátil

 Solicítalo ahora y equipa tu consultorio con tecnología profesional.

 Envío a todo el Perú

 Pedidos al: 930830427

PRODUCTO:
Ventosas faciales

DESCRIPCION:
 Ventosas Faciales de Silicona

Las ventosas faciales de silicona son herramientas de masaje diseñadas para revitalizar y cuidar tu piel de manera natural.

 Beneficios Principales

 Mejoran la circulación sanguínea en el rostro.
 Estimulan la circulación linfática.
? Favorecen la oxigenación de la piel.
 Promueven la eliminación de toxinas.
 Ayudan a lograr un rostro más firme y luminoso.

 Material de Alta Calidad

 Fabricadas con silicona suave y flexible.
 Generan un efecto de succión leve y controlado.
 Se adaptan fácilmente a los contornos del rostro.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Puros de moxa

DESCRIPCION:
 Puros de Moxa de Artemisa • Con Humo 
La moxibustión es una terapia ancestral de calor que ayuda a tonificar la energía de los meridianos, promover la circulación y mejorar el bienestar integral.

 Presentación: Caja con 10 moxas.
 Elaboradas con Artemisa 100% natural, brindando un calor profundo y terapéutico.
 Versión con humo, ideal para tratamientos tradicionales.

? Beneficios:
? Estimula la energía vital (Qi).
? Alivia molestias musculares y articulares.
? Favorece la relajación y el equilibrio corporal.

 Envío a todo el Perú
 Pedidos al: 930830427

 Más información aquí: www.agujasacupuntura.com/moxa-con-humo

Revise los TIPS para moxar en el siguiente enlace:

https://youtu.be/SEHHOCnQANI

PRODUCTO: Porta moxa de acero inoxidable

DESCRIPCION:
Porta Moxa de Acero Inoxidable • Profesional y Duradero 
Un accesorio imprescindible para la práctica de moxibustión.
Fabricado en acero inoxidable de alta calidad, permite esmerilar, sujetar y apagar la moxa con total seguridad.

? Ventajas:
? No se calienta al tacto gracias a su material aislante.
? Resistente y fácil de limpiar.
? Ideal para uso profesional o terapéutico.

 Uso recomendado: Mantén tus sesiones seguras y cómodas controlando el calor y evitando quemaduras.

 Pedidos al por mayor y menor: 930830427
 Envíos a todo el Perú

PRODUCTO: Caja de moxibustión (2 moxas)

DESCRIPCION:
 Caja de Moxibustión de 2 entradas

? Características:

 Elaborada con bamb• para un uso seguro y natural.
 Diseñada para colocar un puro de moxa y realizar una moxibustión indirecta, aliviando el dolor .
 Ideal para optimizar tratamientos de acupuntura, permitiendo moxar un área mientras el terapeuta trabaja en otra parte del cuerpo .
? Cuenta con una fina malla interna que protege al paciente de las cenizas calientes.

Un accesorio esencial para terapias efectivas y seguras. 

 Envío a todo el Perú
 Pedidos al: 930830427

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtube.com/shorts/wEvVAAHFjvQ

PRODUCTO: Roller jade

DESCRIPCION:
 Roller de Jade Térmico para Acupuntura Estética

Ideal para tonificación de puntos de acupuntura y tratamientos faciales.
 Funciona con moxa interna que calienta la cabeza de jade, estimulando la vasodilatación y producción de colágeno.

 Incluye:

Roller con cabeza tipo jade
5 mini moxas doradas de repuesto

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú
 Revisa el producto en el siguiente enlace

https://youtu.be/Fuc0mjPiO8A

PRODUCTO: Moxa sin humo

DESCRIPCION:
 Moxas Sin Humo • El poder de la moxibustión sin olor

 Pack x2 unidades
? No manchan ni generan humo
? Ideales para pacientes con asma o alergias
? Uso profesional en puntos de acupuntura

 Pedidos al 930830427
 Envíos a todo el país

PRODUCTO: Martillo de 5 puntos

DESCRIPCION:
 Kit Martillo 7 Puntas • Flor de Ciruelo

 Herramienta terapéutica con mango flexible de 14 cm para mayor comodidad.
 Incluye 12 cabezales estériles desechables de recambio.
? Técnica de estimulación suave y repetida para activar el flujo energético en zonas o puntos específicos.

? Beneficios:

Favorece la circulación sanguínea y energética.
Apoya en tratamientos de dolor y rigidez muscular.
Ideal para reflexología y puntos de acupuntura.

 Contenido del kit:

1 martillo de 7 puntas.
12 cabezales de recambio.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Mini moxas para aguja caliente

DESCRIPCION:
 Bolsa de Mini Moxas de Artemisa en Cono (100 unidades)

? Características:

 Contiene 100 mini moxas de artemisa en forma de cono.
 Medidas de cada moxa: 1 cm x 1 cm.
 Diseñadas para colocarse en la cabeza de la aguja, utilizadas en la técnica de "Aguja caliente" .
 Ideales para complementar tratamientos de acupuntura y potenciar los resultados terapéuticos.

Una herramienta tradicional para llevar tus terapias al siguiente nivel .

 Para más detalles, consulta la descripción del video en el siguiente enlace.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Pipa de Moxibustión

DESCRIPCION:
 Pipa de Bamb• para Moxibustión

 Herramienta tradicional de Medicina China utilizada para tonificar puntos de acupuntura mediante calor terapéutico.

 Medidas: 23.5 cm de largo x 10 cm de ancho.
 La cabeza de la pipa est• separada del mango para un manejo cómodo.
 Incluye rejilla en la boca para evitar que las cenizas quemen al paciente.
 Ideal para terapia de calor profunda y estimulación de meridianos.

? Beneficios:

Tonifica la energía (Qi) y fortalece la circulación.
Apoya en el tratamiento de dolores musculares y articulares.
Segura y fácil de usar.

 Presentación: 1 unidad.
 Envío a todo el Perú 
 Pedidos al: 930830427

PRODUCTO: Total Gun - Pistola percutora

DESCRIPCION:
Pistola percutora de masajes Total Gun

 Pistola percutora de alta potencia para masajes profundos.

 Alivia tensiones, mejora la circulación y acelera la recuperación muscular.
20 Velocidades.
Pantalla LCD
 Diseño ergonómico y fácil de usar, ideal para uso personal o profesional.
Incluye maleta protectora.

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtu.be/dJtlTeIWtpY

PRODUCTO: Puntor de Auriculoterapia

DESCRIPCION:
 Puntor de Auriculoterapia • Precisión en tus manos

 Herramienta esencial para localizar y estimular puntos auriculares con exactitud.

? Punta fina para detectar puntos activos
? Ideal para diagnóstico y estimulación sin agujas
? Compacto, higiénico y fácil de transportar
? Fabricado en metal resistente

? Recomendado para:
? Terapeutas de auriculoterapia
? Estudiantes y docentes de medicina china

 Tamaño práctico y ergonómico

 Pedidos al 930830427
 Envíos a todo el Perú

 www.agujasacupunturaperu.com

 Más información aquí:

https://youtu.be/o8ZXqNzTfI8?si=SUGBt2EkyazHj6Ny
https://youtu.be/o8ZXqNzTfI8

PRODUCTO: Puntor Retractil

DESCRIPCION:
? Los palpadores se emplean en Auriculoterapia  para explorar y determinar los puntos  como parte de la exploración auricular . También son ideales cuando el paciente no desea la colocación de agujas en las orejas .

¡Una herramienta práctica y versátilútil! 

 Envío a todo el Perú
 Pedidos al: 930830427

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtu.be/o8ZXqNzTfI8?si=SUGBt2EkyazHj6Ny

PRODUCTO: Aplicador de agujas

DESCRIPCION:
 Aplicador de Agujas • Coloca con precisión

 Precisión, rapidez y seguridad en cada aplicación.

El puntor de Auriculoterapia es indispensable ya que te brinda mayor precisión del punto auricular y ademas con una minima fuerza la aguja se inserta sin generar molestias en el paciente.

? Ideal para agujas de Acupuntura y de manopuntura
? Contacto directo y mejora la higiene
? Ligero, práctico y fácil de desinfectar
? Acero inoxidable de alta durabilidad

 Recomendado para terapeutas, docentes y estudiantes.

 Pedidos al 930830427
 Delivery a todo el país

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtube.com/shorts/NYuN7Q9b1Xg?si=jx04HGFJ8MD6JFb6

PRODUCTO: Semillas de Vaccaria

DESCRIPCION:
 Semillas de Vaccaria para Auriculoterapia

Las semillas de vaccaria son utilizadas en auriculoterapia para estimular puntos específicos del oído y ayudar a equilibrar la energía del cuerpo.

? Beneficios:

 Ayudan a reducir estrés, ansiedad e insomnio.
 Apoyan en el alivio del dolor y migrañas.
 Favorecen el equilibrio del organismo según la medicina tradicional.

 Aplicación: Se colocan en puntos del pabellón auricular y se fijan con un adhesivo especial para estimular suavemente la zona durante el día.

Ideales para terapias de auriculoterapia y bienestar natural. ?

 Envío a todo el Perú
 Pedidos al: 930830427

 Más información aquí:

https://youtu.be/32lwZh1lW8U?si=y5tR1_CFWSjCHj-1

PRODUCTO: Tintura de Benjui

DESCRIPCION:
 Tintura de Benju• • Fijación extra en verano

 Asegura mayor duración de balines y parches incluso con sudor y grasa.

? Fácil aplicación sobre piel limpia
?Frasco de 30 ml

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

Puedes revisar el empleo en el siguiente enlace:

https://youtu.be/8aoTCVzHkX8?si=3NY_oT0BVYFdyqEw

PRODUCTO: Imanes de Auriculoterapia

DESCRIPCION:
 Imanes para Auriculoterapia

? Beneficios y características:

 Ideales para estimular puntos clave en la oreja  y promover el equilibrio energético .
? Ayudan en tratamientos de dolor, ansiedad, estrés y otros desequilibrios .
 Tamaño pequeño y fáciles de usar para un tratamiento cómodo.
 Favorecen la mejora del bienestar general de forma natural.

Un complemento perfecto para tus sesiones de auriculoterapia. 

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtube.com/shorts/Po-yTgwLZiA

PRODUCTO: Balines decorativos de Auriculoterapia

DESCRIPCION:
? Balines Transparentes para Auriculoterapia 

 Material Hipoalergénico: ideales para todo tipo de piel.
 Con Núcleo de Plata: mantiene el efecto terapéutico.
 Diseño Estético y Discreto: pensado para la comodidad y satisfacción de los pacientes.

 Presentación: paquete de 100 unidades.

 Envío a todo el Perú
 Pedidos al: 930830427

 En el siguiente enlace puedes apreciar sus características:

https://youtube.com/shorts/PujkCLVgOHU?si=J6gvfeZu0qjqQkMM

PRODUCTO: Chinchetas para Auriculoterapia

DESCRIPCION:
 Chinchetas de Auriculoterapia • Estímulo preciso y prolongado

 Microagujas con adhesivo para estimulación continua de puntos auriculares.

 Beneficios:
? Mayor efectividad
? Efecto profundo
? Caja x100 unidades

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: BALINES DE ORO

DESCRIPCION:
 Balines de Oro de Auriculoterapia • Tonificación premium

 Balines de Oro para Auriculoterapia

Los balines de oro son ideales para estimular puntos auriculares y apoyar tratamientos de bienestar y alivio de diversas dolencias.

? Características:

 Diámetro: 1 mm.
 Algunos imantados para aplicaciones magnéticas y mayor efectividad.
 Diseño práctico para una aplicación rápida y profesional.

Perfectos para auriculoterapia profesional o terapias de cuidado personal.
 Usados en medicina tradicional china para tonificar puntos auriculares.
 Paquete de 180 unidades

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Balines de Plata

DESCRIPCION:
? Balines de Plata para Auriculoterapia

Pequeños balines de plata utilizados para estimular puntos auriculares y corporales en tratamientos de auriculoterapia.

? Características:

 Diámetro aproximado: 1 mm.
 Hechos de plata, permitiendo buena respirabilidad y cuidado de la piel.
 Montados en cinta micropore para fácil aplicación.
 Estimulan puntos terapéuticos para apoyar el bienestar del paciente.

Ideales para terapias de auriculoterapia y estimulación energética con aplicación rápida y práctica.

 Envío a todo el Perú
 Pedidos al: 930830427

 Más información aquí:

 https://youtube.com/shorts/SLiX5u5Bjtk
https://youtube.com/shorts/SLiX5u5Bjtk?feature=share

Perfectos para sesiones cómodas y efectivas de terapia. 

PRODUCTO: Agujas para acupuntura

DESCRIPCION:
• AGUJAS DE ACUPUNTURA Y PUNCIÓN SECA! ?

 Caja de 100 unidades a solo S/20.00
? ¡La mejor calidad al mejor precio del mercado!

 Disponibles en las siguientes medidas:

0.18x13 mm
0.25x13 mm
0.25x25 mm
0.25x40 mm
0.30x50 mm
0.30x60 mm
0.30x75 mm

 Esterilizadas y de uso profesional
 Aptas para tratamientos clínicos y terapias complementarias

 Puedes recoger tu pedido en nuestra oficina:
Av. Julio C. Tello 438 • Lince

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:
Revisa el producto en el siguiente enlace

https://youtube.com/shorts/AvOISXbtmP0?si=h7ylF7wbo6rVA04k
https://youtu.be/wmg5VG2HSNU
https://youtu.be/9ZSsFhg61Ek
https://youtu.be/ZbV9T7K6lfo
https://youtu.be/QZek5girLfQ

PRODUCTO: Agujas Koreanas x caja de 500 und

DESCRIPCION:
      •      ?

¿Buscas agujas confiables y seguras para tus terapias
• Tenemos lo que necesitas!

? Presentación: caja de 500 unidades en presentación de 10 agujas por sobre,
con tubo guía incluido para mayor comodidad.

 Perfectas para tus sesiones de acupuntura y punción seca.
• Pruébalas! Serán tus grandes aliadas en el tratamiento de tus pacientes.

 Disponibles en múltiples medidas:

0.16x7 mm
0.18x13 mm
0.18x25 mm
0.22x25 mm
0.25x25 mm
0.18x30 mm
0.22x40 mm
0.25x40 mm
0.30x40 mm
0.30x50 mm
0.30x75 mm Y muchas más...!

 Delivery en Lima y Callao
 Puedes recoger en nuestra oficina: Av. Julio C. Tello 438 • Lince

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: TENS 7000

DESCRIPCION:
? TENS 7000 • Electroestimulador para Alivio del Dolor

El TENS 7000 es un dispositivo portátil de estimulación nerviosa eléctrica transcutánea diseñado para aliviar dolor muscular, articular y neuropático. Funciona mediante impulsos eléctricos que ayudan a bloquear las señales de dolor y estimular la liberación de endorfinas.

? Características principales:

 5 modos de operación: Burst, Normal, Modulación, Strength Duration y Chopper.
 Intensidad ajustable: de 0 a 100 mA.
 Frecuencia: 1 a 150 Hz.
 2 canales independientes para trabajar diferentes zonas del cuerpo.
 4 electrodos adhesivos reutilizables incluidos.
 Autonomía: hasta 25 horas con batería de 9V.

? Moderno y práctico ?
? 2 salidas para mayor efectividad ?
? Funciona a pilas ?
? Incluye maleta y 4 electrodos de 5x5 cm 
? Garantía de 6 meses ?

 Ideal para fisioterapia y uso en casa, proporcionando alivio del dolor de forma rápida, segura y no invasiva.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Cocodrilos de Electroacupuntura

DESCRIPCION:
Inicio / Productos / Cocodrilos de Electroacupuntura

Cocodrilos de Electroacupuntura
 Cables Cocodrilo para Electroacupuntura

Accesorio esencial para tratamientos de electroacupuntura y electroterapia, diseñado para conectar de forma segura los equipos de electroestimulación.

? Características:

 Pinzas cocodrilo resistentes y adaptables.
 Pinzas intercambiables para mayor practicidad.
? Conexión estándar, compatible con la mayoría de equipos de electroacupuntura.
 Juego de 4 piezas, adaptables y de alta resistencia.
 Juego de cables ideal para tratamientos terapéuticos.

Perfectos como complemento para equipos de electroestimulación en consultorios o terapias profesionales.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Electroacupuntura Tekno Bio Body

DESCRIPCION:
? Tekno Bio Body • Acupuntura Electrónica Profesional

El Tekno Bio Body es un dispositivo que combina tecnología moderna con la medicina tradicional china, ideal para terapias de bienestar, rehabilitación y estética.

? Beneficios:

 Alivia el dolor muscular y la tensión corporal.
 Mejora la circulación sanguínea.
 Reduce el estrés y favorece la relajación.
? Apoya tratamientos estéticos y mejora la apariencia de la piel.
• útil para rehabilitación y terapias de bienestar.

 Características:

 Temporizador programable para mayor control del tratamiento.
 Incluye cargador a corriente, 3 pares de electrodos TENS, 6 salidas y temporizador manual.
 Diseño versátilútil para tratamientos terapéuticos completos.
 12 electrodos adhesivos para aplicación en distintas zonas del cuerpo.

Ideal para uso en casa o en consultorios profesionales

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtu.be/3hQ882MNImc?si=T9ScLSDhhNZ4DPeF
https://youtu.be/FobvLLGqPlM
https://youtu.be/3hQ882MNImc

PRODUCTO: Lapiz Electroacupuntor "Acu doc"

DESCRIPCION:
? Acupoint • Máquina de Electroacupuntura Portátil

Dispositivo práctico y fácil de usar para terapias de electroacupuntura, ideal para tratamientos de bienestar y alivio del dolor.

? Características:

 Intensidad regulable mediante perilla o sistema digital (según modelo).
 Detector de puntos de acupuntura para localizar con precisión las zonas de tratamiento.
 Rueda sensitiva que ayuda a calibrar y detectar el punto exacto.
 Cable tierra que el paciente sostiene para una correcta transmisión de la corriente.
 Recargable para mayor comodidad.
 Incluye 3 cabezales intercambiables de diferentes calibres.

Ideal para terapias profesionales o uso personal en tratamientos de acupuntura.

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

 °Conoce más sobre este producto revisando el siguiente enlace! ?

https://youtu.be/dLaqlnTED3k
https://youtu.be/dLaqlnTED3k?si=A9OYe1f0OhX3-NvE

PRODUCTO: LIGAS ABIERTAS(X3)

DESCRIPCION:
 Ligas abiertas
 Ideal para ejercicios de fortalecimiento
 Contiene: Pack de 3 ligas con diversas intensidades ?

Revisa el siguiente enlace:

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

https://youtu.be/qlpjvqJ0LTg

PRODUCTO: Férula Aluminio 4 Varillas

DESCRIPCION:
 Férulas Digitales • Protege tus dedos con confianza
• Fractura, tendinitis o esguince de dedos

Férula de aluminio de 4 varillas

 Indicada para esguinces o fracturas en los dedos.
? Fabricada en aluminio con ajuste cómodo.
 Tallas disponibles: S, M, L.

 Envío a todo el Perú
 Pedidos al: 930830427

 Para más detalles, consulta la descripción del video en el siguiente enlace.

https://youtube.com/shorts/Ij1NZ87CMDY?si=Uz6rgfOCv1oZucOC

PRODUCTO: Ferula Stack

DESCRIPCION:
 Férulas Digitales • Protege tus dedos con confianza
• Fractura, tendinitis o esguince de dedos

 Tenemos férulas digitales para:
? Fracturas
? Lesiones por impacto
? Esguinces
? Rehabilitación en casa

 Incluye tutorial digital con indicaciones de uso.

 Contáctanos al 930830427
 Envíos todo el Perú

? En el siguiente enlace puede ver el producto

https://youtube.com/shorts/hIsaRLV4k2Q?si=FChqMAWFH41GQ7bp
https://youtu.be/zvXGAvp_EMw
https://youtu.be/Y0WR5Kn3Pas
https://youtu.be/ThdxMKBLZVI
https://youtube.com/shorts/PKfinFU46H4?feature=share

Tutorial masaje manos:

https://youtu.be/vtuPvfHWrqY

PRODUCTO: Rodillera de varilla

DESCRIPCION:
 Rodillera de Soporte con Varilla

La rodillera con varilla es un dispositivo ortopédico diseñado para brindar estabilidad, compresión y soporte a la rodilla, ayudando a prevenir molestias y lesiones durante actividades diarias o deportivas.

? Características:

 Materiales de calidad: neopreno, gel, fibra de cobre y tejido 3D transpirable.
 Varillas laterales de soporte que brindan mayor estabilidad a la articulación.
 Almohadillas EVA para mayor comodidad y protección.
 Correas ajustables que permiten un ajuste seguro y personalizado.

 Beneficios:

Ayuda a prevenir lesiones y brindar soporte a la rodilla.
Favorece la circulación sanguínea.
Ideal para deporte, trabajo físico o actividades que requieren arrodillarse.
Perfecta para quienes buscan protección, estabilidad y comodidad en su rutina diaria.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Rodillera con varilla de Polietileno

DESCRIPCION:
 Rodillera con Varillas de Polietileno • Soporte y estabilidad

Protege tus rodillas con nuestra Rodillera ortopédica reforzada con varillas de polietileno, ideal para brindar firmeza y compresión sin limitar el movimiento.

? Beneficios:

Reduce inflamación y dolor articular
Proporciona soporte en actividades físicas o recuperación de lesiones
Ajuste cómodo con velcro
 Disponible en varias tallas

 Envíos a todo el Perú
 Pedidos al 930830427

PRODUCTO: COMPRESA DE SEMILLAS: MODELO GUANTES

DESCRIPCION:
 Guantes Terapéuticos

 Contiene:

 1 par de guantes de buldemin con semillas y girasoles.
 1 par de guantes de felpa para proteger las manos del calor.

 Beneficio:

 Favorecen la circulación sanguínea en las manos.
 Especialmente útiles para personas con artritis y artrosis.

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

En el siguiente enlace puede revisar sus características:

https://youtu.be/gG9m0mU5WmU?si=xTNqTHVSNphN9zeb

PRODUCTO: Compresas de gel frias

DESCRIPCION:
 Pack de 5 Compresas Frías Reutilizables ?
• Alivio inmediato y práctico para tus terapias y cuidados diarios! 
Este pack de 4 compresas frías es ideal para reducir inflamaciones, aliviar dolores musculares, controlar hematomas y desinflamar lesiones deportivas.
Perfectas para tener siempre a mano en clínicas, consultorios o en casa.

? Beneficios:

? Disminuyen la inflamación y el dolor.
? Ayudan en la recuperación post-entrenamiento.
? útiles para lesiones, golpes, esguinces y dolores musculares.
? Reutilizables y de larga duración.

 Presentación: Pack de 5 unidades.
 Medidas: variadas
 Modo de uso: Conservar en congelador y aplicar en la zona afectada.

 Pedidos al por mayor y menor: +51 930 830 427
 Envíos a todo el Perú

PRODUCTO: Compresas de semillas

DESCRIPCION:
 Pack de Compresas de Semillas • Terapia natural calor.

Disfruta de una terapia relajante con nuestras Compresas de Semillas, rellenas de granos y hierbas naturales, ideales para terapia de calor.

? Beneficios:

Alivia contracturas, dolores musculares y cólicos
Aroma relajante
Reutilizables y fáciles de calentar/enfriar
 Pack disponible en varios tamaños

 Envíos a todo el Perú
 Pedidos al 930830427
 Revisa el video aquí:

https://youtu.be/fCo6F6r0W2A

PRODUCTO: KINESIO TAPE

DESCRIPCION:
 Kinesio Tape • Cinta Terapéutica Elástica

La Kinesio Tape es una cinta adhesiva elástica diseñada para apoyar la recuperación muscular y articular sin limitar el movimiento. Se adapta a la piel y permite continuar con las actividades diarias o deportivas.

? Beneficios:

 Reduce dolor e inflamación al mejorar la circulación.
 Favorece la recuperación muscular después del ejercicio o lesiones.
 Previene lesiones brindando soporte a másculos y articulaciones.
 Mejora la postura y ayuda a disminuir molestias en espalda y cuello.
? Apoya la rehabilitación en esguinces, contracturas y problemas articulares.
 Material: algodón y elastano, transpirable, resistente al agua y cómodo para uso prolongado.
 Vendaje neuromuscular para tratar lesiones en fisioterapia
 Colores variados para elegir ?

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Tacho de Bioseguridad

DESCRIPCION:
 Tacho de Bioseguridad • Gestión segura de residuos

Con nuestros Tachos de Bioseguridad, garantizas una correcta eliminación de residuos clínicos y contaminantes.

 Ideales para:

Consultorios médicos
Clínicas y hospitales
Centros estéticos y de tatuajes
Laboratorios y veterinarias

? Características:

Material resistente y fácil de limpiar
Tapa hermética
Cumplen normas sanitarias y de bioseguridad
Capacidad: 1.5 litros

 Envíos a todo el Perú
 Pedidos al 930830427

PRODUCTO: GEL DE ECOGRAFÍA

DESCRIPCION:
 Gel Ecográfico para Ultrasonido - 5 litros

El gel ecográfico es un producto esencial para obtener imágenes claras y precisas durante los estudios de ultrasonido. Facilita el contacto entre el transductor y la piel, mejorando la calidad del examen.

? Características y beneficios:

 Mejora la calidad de imagen al eliminar el aire entre la piel y el transductor.
 Reduce la fricción, brindando mayor comodidad durante el procedimiento.
 Hipoalergénico y libre de látex, seguro para la mayoría de los pacientes.
 Disponible en presentaciones frías o calientes para mayor confort.

Ideal para centros médicos, fisioterapia, estética y diagnóstico por ultrasonido.

 Gel de ultrasonido ideal para aplicaciones terapéuticas y estéticas.
 Su fórmula optimiza la conducción y cuidado de la piel.
 Presentación: bidón de 5 litros, práctico y rendidor.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Lampara infrarroja

DESCRIPCION:
 Lámpara Infrarroja con Pedestal
• Activa la circulación y relaja tus másculos!

Dispositivo terapéutico que proporciona calor localizado mediante radiación infrarroja, ideal para relajación y alivio muscular.

 Emisión de calor seco que favorece:

? Vasodilatación
? Alivio del dolor
? Relajación profunda

? Características:

? Potencia: 275 W para generación rápida y eficiente de calor.
 Diseño resistente: metal con recubrimiento anti-calor, pedestal ajustable y regulador de intensidad.
 Aplicaciones: alivia dolores musculares, mejora la circulación y reduce tensiones.
 Ideal para consultorios o uso personal.
 Base sólida, foco incluido, fácil de montar
 Lista para usarse en casa o consultorio
 Altura máxima: 147 cm; tamaño compacto en caja: 80x25x20 cm.

 Uso recomendado: consultorios, domicilios o centros de belleza para un tratamiento cómodo y efectivo.

 Envío a todo el Perú
 Pedidos al: 930830427
 Más información aquí:

https://youtu.be/KdLo4EfHchc?si=-P4-j2PYQOSbctBG
https://youtu.be/KdLo4EfHchc

PRODUCTO: Electrodos 5x9 PALS

DESCRIPCION:
? ELECTRODOS RECTANGULARES 5x9 cm

Potencia tus terapias de electroestimulación ?
Los Electrodos Rectangulares 5x9 cm ofrecen excelente conductividad y durabilidad.

? Beneficios:

Mayor área de contacto para zonas amplias.
Adhesión segura y reutilizable.
Compatible con la mayoría de equipos de electroterapia.

 Características:
? Gel conductor de alta calidad
? Forma rectangular para mejor cobertura
? Fáciles de limpiar y guardar

 Envíos a todo el Perú
 Pedidos: 930830427

PRODUCTO: CABLES PARA TENS 7000

DESCRIPCION:
Repuesto de cables para TENS 7000

 Cables de repuesto para tu equipo TENS 7000, garantizando conexión segura y confiable.

 Incluye: 2 unidades por presentación, resistentes y duraderas.
 Perfecto para mantener tus terapias sin interrupciones.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO:
Talonera en herradura

DESCRIPCION:
 Talonera con Herradura de Silicón

La Talonera con Herradura est• elaborada en silicón de alta calidad y est• indicada para personas que presentan espolón calcáneo.

? Beneficios

 Diseñada para ayudar en casos de espolón calcáneo.
 Proporciona una pisada más suave.
 Disminuye el dolor provocado por esta afección.
 Brinda descanso y confort durante el uso diario.
 El silicón se distribuye en el interior del calzado para mayor comodidad.

 Recomendación Importante

Este producto debe utilizarse únicamente bajo prescripción médica.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Ligas cerradas

DESCRIPCION:
Nuestros productos se presentan en diversos niveles de resistencia, permitiendo elegir la opción que mejor se adapte a cada necesidad.

 ¿Por qué elegirlos

 Diferentes tamaños para mayor comodidad.
 Distintos niveles de resistencia según el objetivo.
 Ideales para un ejercicio estructurado y controlado.
 Perfectos tanto para profesionales de la salud como para uso personal.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Rodillera de doble varilla

DESCRIPCION:
 ¿ARTROSIS? ¿DOLOR DE RODILLA? SOBREPESO
¿Meniscos inflamados? Esguince de ligamentos

? Es momento de solicitar tu King Confort!

4

 La rodillera que te brinda:
? Mayor seguridad y estabilidad
? Disminución del dolor
? Mejor movimiento
? Soporte ideal para tu día a día

Ideal para personas con:
? Artrosis
? Lesiones de meniscos
? Esguince de ligamentos
? Dolor por sobrepeso

 Talla: Standard
 Precio: S/ 50.00

 Solicítala ahora y siente la diferencia en cada paso.
 Envío a todo el Perú

 Pedidos al: 930830427

PRODUCTO: Aro de pilates

DESCRIPCION:
 Aros de Pilates

Los aros de Pilates están diseñados para trabajar los másculos de todo el cuerpo, especialmente la zona central o core, permitiendo realizar una gran variedad de movimientos de forma controlada y efectiva.

 Beneficios Principales

 Fortalecen los másculos centrales (core).
 Mejoran la flexibilidad y movilidad.
 Aumentan la fuerza y resistencia muscular.
 Favorecen una mejor postura corporal.
 Ayudan a alinear la columna vertebral.
 Contribuyen a reducir el dolor de espalda.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Digitopresor triangular

DESCRIPCION:
 Gua Sha Triangular • Libera contracturas y activa la energía 

La herramienta Gua Sha en forma de triángulo es ideal para la liberación miofascial, puntos gatillo y masajes energéticos, combinando la tradición oriental con técnicas modernas .

 Usos ideales:
• Fisioterapia 
• Masajes terapéuticos 
• Terapia física 
• Quiropraxia ?
• Medicina complementaria ?

 Características:
• Diseño ergonómico para mejor manejo ?
• Material: madera natural o acrílico resistente
• Presentación: triangular ?

 Mira el uso del producto en el siguiente enlace ?

 Envíos a todo el Perú
 Delivery en Lima y Callao
 Medios de pago: Yape y Plin al 930 830 427

PRODUCTO: Gua Sha

DESCRIPCION:
 Gua Sha: Belleza y Bienestar Natural
• Gua sha• significa raspar• en chino, pero no te dejes engañar por su nombre .
Los masajes actuales con piedras gua sha son suaves, relajantes e increíblemente efectivos.

Cuando se realizan con la presión adecuada y utilizando aceite facial, pueden aportar múltiples beneficios a tu piel.

 Beneficios del Gua Sha

 Reduce la hinchazón y la retención de líquidos
? Ilumina y reafirma la piel
 Mejora el drenaje linfático y la circulación
 Alivia la tensión muscular
 Favorece la producción de colágeno a largo plazo

 Incorpora el gua sha a tu rutina de cuidado facial y disfruta de una piel más firme, luminosa y revitalizada de forma natural.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Mini ventosas (4 pzs)

DESCRIPCION:
 Mini Ventosas

Las mini ventosas son herramientas prácticas, versátilútiles y resistentes, ideales para complementar rutinas de masaje y terapias de bienestar.

 Compactas y eficientes, son una excelente opción para quienes buscan practicidad y rendimiento en cada sesión.

 Características Principales

 Versátilútiles y funcionales para diferentes aplicaciones
 Duraderas y resistentes al uso continuo
 Fabricadas con plástico de alta calidad
 Fáciles de manipular y limpiar

PRODUCTO: Almohadilla codo/rodilla

DESCRIPCION:
 Almohadilla para Codo / Rodilla

La almohadilla para codo o rodilla es un accesorio diseñado para brindar confort y protección durante actividades físicas y movimientos repetitivos.

 Cuida tus articulaciones y mantente activo con mayor seguridad y comodidad.

 Función Principal

 Reduce la presión en las articulaciones
 Disminuye molestias durante el ejercicio
 Ideal para entrenamientos y actividades deportivas
• útil también en actividades diarias

 Beneficios

 Mayor comodidad en cada movimiento
 Protección adicional para tus articulaciones
 Apoyo en rutinas de rehabilitación o prevención

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Bandeja de acero

DESCRIPCION:
 Bandejas de Acero

Las bandejas de acero son recipientes versátilútiles, resistentes y duraderos, utilizados en diversas aplicaciones en tu consultorio.

 Material de Alta Calidad

 Resistentes a la corrosión
 Fáciles de limpiar y desinfectar
 Material duradero para uso continuo
 Una opción práctica, higiénica y confiable para múltiples necesidades.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Herramienta miofascial

DESCRIPCION:
 Herramienta Miofascial

La herramienta miofascial es un instrumento terapéutico utilizado para trabajar el sistema miofascial, que incluye la fascia y los másculos del cuerpo.

Se emplea principalmente en terapias físicas para ayudar a liberar tensiones y mejorar el bienestar muscular.

 °Cómo funciona

Permite al fisioterapeuta aplicar presión suave y sostenida sobre las zonas afectadas, ayudando a relajar los tejidos y mejorar su funcionamiento.

 Beneficios

 Libera tensiones musculares acumuladas
 Mejora la circulación sanguínea
 Favorece el flujo linfático
 Ayuda a mejorar la movilidad y relajación muscular

 Una herramienta ideal para terapias de fisioterapia, rehabilitación y cuidado del sistema muscular.

 Presentación: 1 unidad.
 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Kit Miofascial x 3 pzs

DESCRIPCION:
 Kit Miofascial

Los kits miofasciales son herramientas esenciales para profesionales de la salud que buscan mejorar la técnica de liberación miofascial y aumentar la eficacia de sus tratamientos.

Están diseñados para facilitar la aplicación de técnicas terapéuticas, permitiendo trabajar con mayor profundidad y precisión, reduciendo al mismo tiempo la fatiga manual del terapeuta.

 Características Principales

 Piezas anatómicamente diseñadas para adaptarse a diferentes zonas del cuerpo
 Diseño ergonómico que facilita el manejo durante la terapia
? Fabricados con materiales conductores y resistentes
 Permiten aplicar técnicas de liberación más profundas y efectivas

 Beneficios

 Mejora la eficacia del tratamiento miofascial
 Ayuda a liberar tensiones musculares y fasciales
 Reduce la fatiga en las manos del terapeuta
 Ideal para fisioterapia, rehabilitación y terapias manuales
 Una solución profesional para optimizar las terapias y mejorar la experiencia tanto del terapeuta como del paciente.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Maqueta oreja 18 cm

DESCRIPCION:
 Maqueta de Oreja de 18cm

Es una herramienta didáctica diseñada para el estudio y la enseñanza de los puntos de acupuntura y meridianos del cuerpo humano.

Ideal para estudiantes, profesionales de la salud y personas interesadas en la medicina tradicional.

 Descripción:

 Fabricado en PVC blando de alta calidad
 Material ecológico y resistente
 Permite visualizar claramente los puntos de acupuntura en el oído
 Letras en alta definición (HD)
 Puntos de acupuntura claramente marcados
 Facilita el aprendizaje de los meridianos del oído

 Tamaño del Modelo

 Modelo de 18 cm altamente detallado
 Señala cuidadosamente los puntos de presión y meridianos
 Textura clara que facilita la observación y el estudio
 Ideal para acupunturistas y profesionales de la salud
 Excelente para estudiantes de medicina y terapias alternativas
• útil para aprendizaje, demostraciones y estudio de meridianos
 También puede utilizarse como herramienta de exhibición educativa
 Una herramienta práctica y detallada para el aprendizaje y la enseñanza de la acupuntura auricular.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Roller de Moxibustión

DESCRIPCION:
 Roller de Moxibustión

El roller de moxibustión es un dispositivo portátil diseñado para calentar y masajear puntos específicos del cuerpo, combinando técnicas tradicionales de masaje con los beneficios de la moxibustión.

 °Cómo funciona

Este dispositivo utiliza moxa de artemisa en su interior, generando calor que se transmite a través de su cubierta exterior de metal cromado, permitiendo aplicar calor de forma controlada durante el masaje.

 Usos y Beneficios

? Ayuda a tonificar los meridianos energéticos
 Permite realizar masajes terapéuticos y energéticos
 Estimula puntos específicos del cuerpo
 Proporciona calor localizado para mayor relajación

 Características

 Diseño portátil y práctico
 Cubierta de metal cromado resistente
 Utiliza moxa de artemisa para generar calor terapéutico
 Ideal para terapias de bienestar, medicina tradicional y masajes energéticos.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Maqueta de Manopuntura

DESCRIPCION:
 Maqueta de Manopuntura

El modelo de manopuntura es una herramienta educativa ideal para quienes estudian acupuntura y medicina tradicional oriental. Permite visualizar de forma clara la ubicación de los puntos de acupuntura en la mano humana, facilitando el aprendizaje y la práctica.

 Herramienta de Aprendizaje

Este modelo ayuda a comprender la relación entre los puntos de acupuntura de la mano y su correspondencia con los órganos del cuerpo según la medicina tradicional.

 Identificación Detallada

 Puntos de acupuntura claramente señalados
 Identificación con caracteres chinos
 Incluye numeración en números arábigos
 Facilita el estudio y reconocimiento de cada punto

 Ideal Para

 Estudiantes de acupuntura y medicina tradicional
 Profesionales y practicantes de terapias orientales
 Uso en clases, demostraciones y prácticas educativas
 Una herramienta práctica y visual para aprender y aplicar correctamente los puntos de acupuntura en la mano.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Maqueta de Reflexología

DESCRIPCION:
 Maqueta de Reflexología

Es una herramienta educativa que muestra la relación entre puntos específicos en los pies, manos y orejas y los diferentes órganos y sistemas del cuerpo.

Esta técnica se basa en la estimulación de estos puntos para favorecer el equilibrio natural del organismo.

 °Cómo funciona

Al aplicar presión en puntos reflejos específicos, se busca estimular diferentes áreas del cuerpo, promoviendo una sensación de bienestar y equilibrio.

 Beneficios

 Ayuda a restablecer el equilibrio natural del cuerpo
 Favorece el bienestar general
 Promueve la relajación y estimulación de puntos reflejos

 Uso Educativo y Terapéutico

 Ideal para estudiantes y profesionales de terapias complementarias
• útil como herramienta didáctica en formación
 Apoyo en el aprendizaje de técnicas de reflexología

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Línea de Ventosaterapia

DESCRIPCION:
 Ventosaterapia

 Buen día, te saludamos desde Agujas de Acupuntura Perú.
Tenemos una amplia gama de productos en Ventosaterapia:

 Ventosas de vidrio
 Ventosas giratorias
 Ventosas biomagnéticas
 Ventosas reductoras
 Ventosas faciales y más...

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO: Aceites Esenciales

DESCRIPCION:
Descubre el poder natural de los Aceites Esenciales 
Ideales para masajes, aromaterapia y bienestar.

 Beneficios:
? Promueven la relajación y el equilibrio
 Ideales para masajes terapéuticos
 Aromas naturales que ayudan a reducir el estrés
 Favorecen un ambiente de calma y bienestar

 Perfectos para terapeutas, fisioterapeutas y uso personal

 Precios al por mayor y menor
 Envíos a todo el país

 Haz tu pedido ahora al 930830427

PRODUCTO: Herramientas de masaje

DESCRIPCION:
 Herramientas de masaje

 Buen día, te saludamos desde Agujas de Acupuntura Perú.

Tenemos una amplia gama de herramientas de masaje:
 Thera Press
 Flex Confort
 Digitopresor en lápiz
 Gua Sha para masajes y más

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO: Linea de Compresas?

DESCRIPCION:
 Compresas

 Buen día, te saludamos desde Agujas de Acupuntura Perú.

Tenemos una amplia gama de productos en compresas:
 Compresas frías
 Compresas calientes de semilla
 Compresas en botas de semillas
 Manoplas de semillas y más

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO: Línea de Fisioterapia

DESCRIPCION:
 Fisioterapia

 Buen día, te saludamos desde Agujas de Acupuntura Perú.

Tenemos una amplia gama de productos de Fisioterapia:
 Pistola percutora Total Gun
? Electroacupuntor de mesa
? Electroacupuntor portátil
 Electrodos cuadrados, rectangulares y faciales
 Kinesio tape
 Lámparas infrarrojo y más...

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO: Línea de Aromaterapia & Flores de Bach

DESCRIPCION:
 Aromaterapia

 Buen día, te saludamos desde Agujas de Acupuntura Perú.

Tenemos una amplia gama de productos de Aromaterapia:
 Aceites esenciales Amazonik (aromas variados)
 Aceites de masaje (aromas variados)
 Probadores de esencias y más...

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO:  Línea de Auriculoterapia

DESCRIPCION:
 Todo en Auriculoterapia

 Buen día, te saludamos desde Agujas de Acupuntura Perú.

Tenemos una amplia gama de productos en Auriculoterapia:
 Semillas de vaccaria
? Balines de oro
 Balines de plata
 Imanes
 Chinchetas
 Láminas
 Maquetas y más...

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO: Todo en Agujas de Acupuntura y Moxibustión

DESCRIPCION:
 Agujas de Acupuntura y Moxibustión

 Buen día, te saludamos desde Agujas de Acupuntura Perú.

Tenemos una amplia gama de productos en:
? Agujas de Acupuntura
 Moxas con humo
 Moxas sin humo
 Cajas de moxibustión
 Muñecos de Acupuntura
 Láminas y más...

 Hacemos envíos a todo el Perú.
 Solicita tu pedido por WhatsApp al 930830427.

PRODUCTO: Lapiz de electroacupuntura

DESCRIPCION:
 Lápiz Electroestimulador de Acupuntura ?
 Emite 9 intensidades ajustables ?
 Funciona con 1 sola pila AA ?
 Ideal para masaje con corriente  o para aplicar corriente en agujas en electroacupuntura 
 Incluye múltiples cabezales de recambio ?
 Fácil de usar ?

 Revisa el modo de empleo en el siguiente enlace ?

https://youtu.be/t46oNxU5gFQ

https://www.youtube.com/watch?v=c7PVwvAd4ko

 Presentación: 1 unidad.
 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Caja de Moxibustión (1 moxa)

DESCRIPCION:
 Cajas de Moxibustión de Bamb• de 1 Moxa

Practicidad y seguridad en tus terapias

Las cajas de moxibustión de bamb• te brindan comodidad y soporte durante la terapia, permitiendo moxar puntos de acupuntura mientras trabajas otros sistemas en el paciente .

 Incluyen una liga de sujeción que evita caídas y una malla metálica en la base para proteger la piel del paciente de las cenizas calientes .
 Utilizan moxa de artemisa, ideal para una combustión estable y terapéutica.

 Contenido:
 1 Caja de bamb• con accesorios de seguridad

 Revisa el tutorial del producto en el siguiente enlace ?

https://youtube.com/shorts/wEvVAAHFjvQ

 Realizamos envíos a todo el Perú
 Haz tu pedido al 930 830 427

PRODUCTO: Lamina de Reflexología

DESCRIPCION:
 LÁMINA REFLEXOLOGÍA PODAL

 "Conecta con el cuerpo a través de tus pies"

 Representación completa de los órganos y sistemas reflejados en la planta del pie.
 Apoyo para sesiones de reflexología, masajes o estudios de terapias holísticas

 Tamaño A3 | Impresión láser | Alto relieve | Plastificado con celulosa

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú
 Revisa el producto en el siguiente enlace

PRODUCTO: Lamina Auriculoterapia topográfica

DESCRIPCION:
 LÁMINA AURICULOTERAPIA

 "Conoce el universo del cuerpo reflejado en la oreja"

 Explora los puntos reflejos del pabellón auricular según la medicina china. Ideal para terapeutas, estudiantes y profesionales de la salud integral.
 Identificación precisa de órganos, sistemas y puntos emocionales
 Herramienta de apoyo visual en consultas clínicas y clases
 Tamaño A3 | Impresión láser | Alto relieve | Plastificado con celulosa

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Lamina Auriculoterapia 1

DESCRIPCION:
 LÁMINA AURICULOTERAPIA

 "Conoce el universo del cuerpo reflejado en la oreja"

 Explora los puntos reflejos del pabellón auricular según la medicina china. Ideal para terapeutas, estudiantes y profesionales de la salud integral.
 Identificación precisa de órganos, sistemas y puntos emocionales
 Herramienta de apoyo visual en consultas clínicas y clases
 Tamaño A3 | Impresión láser | Alto relieve | Plastificado con celulosa

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: LÁMINA DE AURICULOTERAPIA 2

DESCRIPCION:
 Lámina de Auriculoterapia

La lámina de auriculoterapia es una herramienta visual diseñada para facilitar la identificación y el estudio de los puntos auriculares utilizados en terapias de medicina tradicional y terapias complementarias.

Ideal para consultorios, centros de terapia, estudiantes y profesionales de la salud.

 Dimensiones

 Tamaño A3: 297 • 420 mm

 Características

 Mapa detallado de puntos de auriculoterapia
? Material en alto relieve para mejor visualización y aprendizaje
 Ideal para estudio, enseñanza y consulta terapéutica
 Perfecta para acupunturistas, terapeutas y estudiantes
 Una guía práctica para aprender y aplicar correctamente los puntos de auriculoterapia.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: LÁMINA AURICULOTERAPIA 3

DESCRIPCION:
 Lámina de Auriculoterapia

La lámina de auriculoterapia es una herramienta visual ideal para el aprendizaje y la identificación de los puntos auriculares utilizados en terapias de medicina tradicional y terapias complementarias.

Perfecta para consultorios, centros de terapia, estudiantes y profesionales de la salud.

 Dimensiones Disponibles

 Tamaño A2: 420 • 594 mm
 Precio: S/ 55.00

 Tamaño A3: 297 • 420 mm
 Precio: S/ 25.00

 Características

 Mapa detallado de los puntos de auriculoterapia
? Material en alto relieve para una mejor visualización
 Ideal para estudio, enseñanza y consulta terapéutica
 Perfecta para acupunturistas, terapeutas y estudiantes
 Una herramienta práctica para aprender y aplicar correctamente la auriculoterapia.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Meridiano de Higado

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL HÍGADO • Medicina Tradicional China (A3)

 °Canaliza la energía y equilibra tus emociones

El Meridiano del Hígado regula el flujo del Qi (energía vital) y las emociones como la ira o frustración. Ayuda con problemas menstruales, digestivos, tensión muscular y visión borrosa.
• Qu• incluye
? Lámina A3 independiente
? Impresa en láser con alto relieve
? Plastificado con lámina de celulosa
? Código QR escaneable con:
 Función terapéutica de cada punto
 Video 3D de su recorrido energético

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano de la Vesícula Biliar

DESCRIPCION:
 LÁMINA DEL MERIDIANO DE LA VESÍCULA BILIAR • Medicina Tradicional China (A3)
• Toma decisiones con claridad y firmeza

El Meridiano de la Vesícula Biliar se vincula con la toma de decisiones, coraje, y liberación de la ira. Tratamiento ideal para migrañas, contracturas del cuello y lateral del cuerpo, as• como bloqueos emocionales.
• Qu• incluye
? Lámina A3 independiente
? Impresión láser profesional con relieve
? Plastificado resistente de celulosa
? Código QR con:
 Descripción terapéutica de todos los puntos
 Video 3D del recorrido energético completo

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano Triple Recalentador

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL TRIPLE REGENERADOR (TR o San Jiao) • Medicina Tradicional China (A3)
• Armoniza tus órganos y sistemas internos

Este meridiano regula las tres cavidades del cuerpo: digestiva, respiratoria y excretora. Excelente para equilibrio metabólico, estrés, regulación hormonal y control de la temperatura corporal.
• Qu• incluye
? Lámina A3 independiente
? Impresa en láser con alto relieve
? Plastificado protector de celulosa
? Código QR con:
 Uso terapéutico de cada punto
 Video 3D explicativo del recorrido completo

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano de Maestro del Corazón

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL MAESTRO DEL CORAZÓN (Pericardio) • Medicina Tradicional China (A3)
• Protege tu centro emocional y energético

El Meridiano del Maestro del Corazón resguarda el corazón de agresiones físicas y emocionales. útil para aliviar tensión emocional, ansiedad, taquicardias, insomnio y afecciones del sistema circulatorio.
• Qu• incluye
? Lámina tamaño A3 individual
? Impresión láser de alta resolución
? Relieve + plastificado resistente de celulosa
? Código QR con:
 Detalle terapéutico de cada punto
 Video 3D con el trayecto completo del meridiano

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano de Riñón

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL RIÑÓN • Medicina Tradicional China (A3)
• Fuente de la energía vital y ancestral

El Meridiano del Riñón se asocia con la longevidad, vitalidad, miedo, fertilidad y metabolismo. Es clave en casos de fatiga crónica, debilidad sea, problemas urinarios y bloqueos emocionales profundos.
• Qu• incluye
? Lámina A3 con diseño individual
? Impresión láser + relieve profesional
? Plastificado con lámina de celulosa
? Código QR con:
 Explicación funcional de todos los puntos
 Video 3D ilustrativo del recorrido energético

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano de la Vejiga

DESCRIPCION:
LÁMINA DEL MERIDIANO DE LA VEJIGA • Medicina Tradicional China (A3)
• Fluye y libera lo que ya no necesitas

El Meridiano de la Vejiga es el más largo del cuerpo. Relacionado con el sistema nervioso, tensiones musculares, estrés, miedos profundos y rigidez tanto física como emocional. Ideal para terapias descontracturantes.
• Qu• incluye
? Lámina independiente A3
? Impresión láser profesional + alto relieve
? Plastificado protector de celulosa
? Código QR escaneable:
 Explicación detallada de cada punto
 Video 3D del recorrido completo del meridiano

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano del Intestino Delgado

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL INTESTINO DELGADO • Medicina Tradicional China (A3)
• Discernimiento y claridad en cuerpo y mente

Este meridiano regula la absorción, la separación entre lo útil y lo que debe eliminarse. Indicado en dolores articulares, tensión muscular, zumbidos de oído y trastornos del juicio emocional.
• Qu• incluye
? Lámina individual A3
? Impresa en láser con alto relieve
? Plastificada con celulosa
? Código QR escaneable con:
 Funciones detalladas de cada punto
 Video 3D con todo el recorrido visual del meridiano

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano del Corazón

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL CORAZÓN • Medicina Tradicional China (A3)
• El hogar del Shen: armoniza tu espíritu

El Meridiano del Corazón est• vinculado con la conciencia, el sueño, la alegría y el equilibrio mental. Indispensable para trastornos emocionales, insomnio, palpitaciones y ansiedad.
• Qu• incluye
? Lámina A3 individual
? Impresión láser profesional
? Alto relieve + plastificado de celulosa
? Código QR con:
 Información terapéutica de los puntos
 Video 3D interactivo con su recorrido completo

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO:  Meridiano del Bazo-Páncreas

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL BAZO-PÁNCREAS • Medicina Tradicional China (A3)
• Estabilidad emocional desde tu centro vital

El Meridiano del Bazo-Páncreas influye en la transformación de alimentos y emociones. Muy útil para tratar fatiga, anemia, problemas menstruales, digestión lenta, ansiedad por comida, y exceso de pensamientos.
• Qu• incluye
? Formato A3 individual
? Impresión láser + alto relieve
? Plastificado con celulosa protectora
? Código QR escaneable:
 Detalle terapéutico punto por punto
 Video 3D explicativo del recorrido del meridiano

 Pedidos al por mayor y menor al 930830427
 Envíos a todo el Perú

PRODUCTO: Meridiano de estomago

DESCRIPCION:
 LÁMINA DEL MERIDIANO DEL ESTÓMAGO • Medicina Tradicional China (A3)
• Nutre tu cuerpo, fortalece tu centro

El Meridiano del Estómago regula la digestión física y emocional. Asociado con la toma de decisiones, nutrición y ansiedad. Ideal para abordar problemas digestivos, retención de líquidos, fatiga crónica y trastornos emocionales ligados al control.
• Qu• incluye
? Lámina independiente tamaño A3
? Impresa en láser de alta calidad
? Con alto relieve y plastificado protector de celulosa
? Código QR con:
 Descripción terapéutica de cada punto
 Video 3D con el recorrido completo del meridiano

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Moxa dorada suelta

DESCRIPCION:
La moxa dorada es un tipo de moxibustión refinada, utilizada en la medicina tradicional china, elaborada con artemisa (mugwort) de alta calidad y procesada varias veces para obtener una textura más suave, fina y eficaz.
• Qu• es la moxibustión

La moxibustión es una técnica terapéutica en la que se quema artemisa seca (una planta medicinal) cerca de la piel o sobre puntos de acupuntura para:

Estimular el flujo de energía (Qi)
Calentar canales energéticos
Aliviar dolores, rigidez, fatiga o frío interno

? Qu• hace especial a la moxa dorada

Se le llama "dorada" por el color claro y brillante de la artemisa finamente molida. Sus características:

Alta pureza (pasada por múltiples filtros)
Textura sedosa y sin impurezas
Arde de manera suave y pareja
Produce menos humo que otras moxas comunes

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Detector de puntos de Auriculoterapia

DESCRIPCION:
 Detector de Puntos de Auriculoterapia • Precisión garantizada
• Qu• hace el detector de puntos

El detector permite encontrar los puntos activos (puntos que responden al malestar o desequilibrio del cuerpo). Estos puntos suelen estar:

Más sensibles al tacto
Con menor resistencia eléctrica (en detectores electrónicos)
Levemente hundidos o duros al presionar (en detectores manuales)

 Coloca la punta metálica en la oreja y espera la luz verde: punto localizado!

 Presentación en caja con instrucciones.

 Pide el tuyo al 930830427
 Envíos a nivel nacional

PRODUCTO: Puntor de Acero Inoxidable

DESCRIPCION:
Un puntor de acero inoxidable es una herramienta terapéutica pequeña, fina y alargada, diseñada para estimular puntos específicos del cuerpo, especialmente en técnicas como:

Digitopuntura
Reflexología
Auriculoterapia
Acupresión sin agujas
• Qu• es exactamente un puntor

Es como un palillo metálico terminado en una punta redondeada o aguda (pero no perforante).

Se usa para presionar con precisión puntos energéticos del cuerpo, similares a los de la acupuntura, pero sin agujas ni penetración.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Pack Miofascial

DESCRIPCION:
 Pack de Herramientas Miofasciales
• Libera tensión en cada movimiento!

 Libera adherencias y relaja profundamente con este pack de herramientas para liberación miofascial.

Incluye 2 modelos esenciales:
 Modelo alargado para zonas amplias.
 Modelo tipo manopla para mayor control y precisión.

? Ideal para fisioterapia, masajes y recuperación muscular.
? Material resistente y ergonómico.
 Pack x2 piezas.

 Pide el tuyo al 930830427
 Envío a todo el Perú 

PRODUCTO: Digitopresor de reflexología

DESCRIPCION:
Este instrumento terapéutico est• diseñado para facilitar la estimulación de zonas reflejas y puntos específicos del cuerpo, permitiendo aplicar presión de forma precisa durante terapias de acupresión y reflexología.

 Materiales

Puede estar fabricado en diferentes materiales resistentes como:

 Madera
 Acero
 Plástico
 Resina

 Funciones Principales

 Estimular zonas reflejas con mayor precisión
 Aplicar presión sin usar directamente los dedos
 Trabajar puntos reflejos específicos del cuerpo
? Ayudar a liberar bloqueos de energía (Qi) según la medicina oriental

 Beneficios

 Apoyo en el tratamiento de dolores y tensiones
 Puede ayudar a reducir estrés
 Contribuye al bienestar en casos de problemas digestivos o insomnio
 Permite realizar acupresión sin el uso de agujas
 Una herramienta práctica para terapias de reflexología, acupresión y bienestar integral.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Gua sha en media luna

DESCRIPCION:
 Gua Sha • Técnica de Bienestar y Cuidado de la Piel

El Gua Sha es una técnica ancestral de la medicina tradicional china que consiste en deslizar o raspar suavemente la piel con una herramienta especial para estimular diferentes procesos naturales del cuerpo.

 Beneficios del Gua Sha

 Estimula la circulación sanguínea
 Ayuda a reducir tensiones musculares
 Favorece la desintoxicación del organismo
? Contribuye a mejorar el aspecto y luminosidad de la piel

 Diseño de la Herramienta

La herramienta de forma de medialuna tiene una curvatura suave que permite adaptarse fácilmente a distintas zonas del rostro y del cuerpo.

 Zonas de Aplicación

 Mandíbula
 Pómulos
 Cuello
? Frente
 Espalda o brazos
 Ideal para complementar rutinas de cuidado facial, relajación y terapias de bienestar.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Puntor de reflexología

DESCRIPCION:
 Reflexología Podal

La reflexología podal es una técnica terapéutica que consiste en aplicar presión en puntos específicos del pie, los cuales se relacionan con diferentes órganos y sistemas del cuerpo.

Su objetivo es ayudar a equilibrar la energía del organismo y contribuir al bienestar general.

 °Cómo se realiza

La técnica es aplicada por un reflexoterapeuta, quien utiliza principalmente el pulgar para ejercer presión en distintas zonas del pie, estimulando los puntos reflejos correspondientes.

Durante la sesión, el especialista puede identificar posibles desequilibrios energéticos mediante:

 Sensibilidad en ciertas zonas del pie
 Sensación similar a pequeños granos de arena bajo la piel

 Beneficios Potenciales

La reflexología podal puede ayudar como apoyo para:

 Ansiedad y estrés
 Insomnio
 Dolores corporales
 Problemas digestivos como estreñimiento

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Cero Smoke

DESCRIPCION:
 ZEROSMOKE utiliza dos imanes biomagnéticos que estimulan puntos específicos en la oreja según la medicina tradicional china, ayudando a reducir la ansiedad por la nicotina• sin químicos ni medicamentos!

? Sin efectos secundarios.
? Fácil de usar en cualquier momento del día.
? Discreto, cómodo y reutilizable.
? Empleo diario de 6 horas

 El paquete incluye:

 Par de imanes biomagnéticos
 Manual de instrucciones

 °Contáctanos al: 930830427

PRODUCTO: Mechero para ventosas

DESCRIPCION:
Mechero para ventosas
 Mechero para Ventosaterapia ?

El Mechero de Ventosas es una herramienta esencial en las terapias con ventosas de vidrio o bamb• .

? Ofrece mayor seguridad para evitar quemaduras 
? Favorece una combustión más eficiente ?
? Mejora la adhesión al cuerpo del paciente 

 Material:  Manija de madera  Cesto de metal

 Modo de uso:  Coloca algodón dentro, rocía alcohol, enciende y trabaja con ventosas de bamb• o vidrio.

 Previene accidentes como quemaduras en pacientes.
• Solicítalo ya!

 930 830 427

 Revisa el producto en el siguiente enlace

https://youtu.be/o9SVmCqd55g?si=BL_Ag5TKIK-t9i1c

PRODUCTO: Ventosas Biomagneticas

DESCRIPCION:
 Ventosas Biomagnéticas • 3 Terapias en 1 

Estas ventosas combinan tres poderosos beneficios en una sola herramienta terapéutica:

1 Absorción del cupping para estimular la circulación ?
2 Digitopresión gracias a su punta imantada ?
3 Biomagnetismo con polos positivo (+) y negativo () que generan un campo biomagnético terapéutico 

 Presentación:
Incluye juego de 8 piezas:
 4 ventosas con punta positiva
 4 ventosas con punta negativa

 Permite tonificar o dispersar según los principios de la Medicina Tradicional China ?
 Ideal para acupuntura estética, tratamientos energéticos y terapias complementarias.
 Incluye maletín portátil y manual de puntos para su correcta aplicación.
• Muy fácil de usar!

 Realiza tu pedido al 930 830 427
 Hacemos envíos a todo el Perú

PRODUCTO: Mini moxas gold

DESCRIPCION:
 Mini Moxas Gold • Calor preciso para tus terapias ?

Las Mini Moxas Gold están diseñadas especialmente para aplicar la técnica de agujas calientes y como repuesto ideal para el uso con el roller de jade .
 Están elaboradas con moxa fina dorada, conocida por su alta calidad y por mantener la combustión de manera constante, sin apagarse fácilmente .

 Presentación:
 Caja con 54 unidades

 Puedes ver el tutorial del producto en el siguiente enlace

PRODUCTO: Triangulo de acrilico

DESCRIPCION:
Digitopresor triangular de acrílico

 Herramienta de masaje triangular, fabricada en acrílico resistente.
 Relaja contracturas y activa puntos energéticos del cuerpo.
? Práctico para tratamientos personalizados y precisos.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Maqueta cabeza de Acupuntura

DESCRIPCION:
 Maqueta de Cabeza de Acupuntura

 Permite ubicar los meridianos y puntos específicos
 Tamaño: 18 cm
 Material: PVC resistente

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Compresa en botas

DESCRIPCION:
 Compresas en forma de Botas • Calor Terapéutico

 Estimula la circulación y alivia molestias en los pies
 Se calientan en microondas (2 min 20 seg.)
 Hechas con semillas de girasol

Ideal para:

pie cansado
espolón calcáneo
falta de circulación

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Man• Terapéutico

DESCRIPCION:
 Man• Terapéutico • Para Estiramiento y Masaje

 Ayuda a mejorar el rango articular
 Material resistente al peso del usuario
 Ideal para estiramientos y liberación muscular

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Digitopresor Flex confort

DESCRIPCION:
? Digitopresor Flex Confort

 Ideal para auto masaje y alivio de tensión muscular
 Fabricado en PVC resistente
 Doble punta: redonda y plana
 Reduce el desgaste de las manos del terapeuta

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: ÁRNICA Y ROMERO - Aceite para masaje

DESCRIPCION:
• ÁRNICA Y ROMERO • Aceite de Masaje Terapéutico (120 ml)

Alivio muscular y acción antiinflamatoria

Este poderoso dúo natural es ideal para:
 Contracturas musculares
 Inflamaciones y golpes
 Recuperación post-ejercicio
 Estimular la circulación y reducir el dolor
• Perfecto para terapeutas, deportistas y para casa!

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: LAVANDA - Aceite para masaje

DESCRIPCION:
 Aceite de Masaje de Lavanda

El aceite de masaje de lavanda es ideal para brindar relajación y bienestar durante terapias de masaje. Su agradable aroma ayuda a generar una sensación de calma mientras contribuye a relajar los másculos.

 Beneficios

 Relajante muscular natural
 Ayuda a calmar y reducir tensiones
 Aroma suave que favorece la relajación y el bienestar

 Presentaciones Disponibles

 120 ml
 500 ml

 Ideal para masajes terapéuticos, relajantes y sesiones de bienestar.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: CANELA • Aceite para Masaje

DESCRIPCION:
 CANELA • Aceite de Masaje (120 ml)

Energizante, reconfortante y afrodisíaco natural

Este aceite de aroma cálido y especiado:
 Activa la circulación sanguínea
 Estimula los sentidos y mejora el estado de ánimo
 Ideal para masajes revitalizantes y sensuales
 Potente efecto calor para aliviar zonas tensas o frías

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: ROSA - LAVANDA - JAZMÍN (MIX FLORAL) - Aceite para masaje

DESCRIPCION:
 Aceite de Masaje Mix Floral

El aceite de masaje Mix Floral combina delicadas esencias naturales de Rosas, Lavanda y Jazmín, creando una experiencia aromática ideal para momentos de relajación y bienestar.

Su mezcla floral ayuda a generar un ambiente armonioso durante las sesiones de masaje.

 Beneficios de sus Aromas

 Lavanda: Favorece la relajación y ayuda a disminuir la tensión.
 Rosas: Promueven una sensación de tranquilidad y equilibrio.
 Jazmín: Conocido por sus propiedades afrodisíacas y relajantes.

 Presentaciones Disponibles

 120 ml
 500 ml

 Ideal para masajes relajantes, terapias de bienestar y aromaterapia. ?

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO:  Aceite esencial de Limón

DESCRIPCION:
 ACEITE ESENCIAL DE LIMÓN • Amazonik 10 ml
• El aroma de la claridad• • Refresca la mente y purifica las emociones

El aceite esencial de Limón es reconocido por sus múltiples beneficios psicoemocionales:
 Estimula la concentración y mejora la memoria
 Disipa la fatiga mental y la confusión
 Eleva el ánimo y combate estados de apatía
 Aporta una sensación de limpieza emocional y renovación
 Perfecto para meditación, estudios o ambientes laborales

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Aceite esencial de Naranja

DESCRIPCION:
 Aceite Esencial de Naranja • El Aroma de la Felicidad Interior

El aceite esencial de naranja destaca por su aroma cítrico, dulce y refrescante, ideal para crear una sensación de bienestar, energía y armonía en el día a día.

? Beneficios principales:

 Mejora el estado de ánimo y ayuda a reducir el estrés.
 Promueve la relajación, aportando calma y bienestar emocional.
? Cuidado de la piel, ayudando a mantener una apariencia más luminosa y fresca.
 Aromatiza espacios, creando un ambiente limpio, alegre y revitalizante.
 Muy utilizado en aromaterapia para generar sensaciones de optimismo y energía positiva.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Mandarina

DESCRIPCION:
 Aceite Esencial de Mandarina • El Aroma de la Serenidad Infantil

El aceite esencial de mandarina destaca por su aroma dulce, cítrico y alegre, ideal para aromaterapia y cuidado personal por sus propiedades relajantes y revitalizantes.

? Beneficios principales:

 Ayuda a reducir el estrés y la ansiedad, generando calma y bienestar emocional.
 Mejora el estado de ánimo, aportando sensación de alegría y energía positiva.
? Cuidado de la piel, ayudando a mantenerla suave, luminosa y equilibrada.
 Aromatiza espacios, creando un ambiente fresco, alegre y acogedor.
 Favorece la relajación, siendo ideal para masajes y momentos de tranquilidad.

Perfecto para quienes buscan bienestar emocional, frescura y un aroma dulce y cítrico en su día a día.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Citronella

DESCRIPCION:
 Aceite Esencial de Citronela • El Aroma del Refugio Natural

El aceite esencial de citronela se destaca por su aroma cítrico, fresco y herbal, ampliamente utilizado en aromaterapia, cuidado personal y protección natural.

? Beneficios principales:

 Repelente natural de insectos, ideal para mantener alejadas a las moscas y mosquitos.
 Ayuda a reducir el estrés y la tensión, generando sensación de calma.
 Aromatiza y purifica espacios, creando un ambiente fresco y agradable.
 Relajación y bienestar, ideal para masajes o difusión en casa.
? Cuidado de la piel, contribuyendo a mantenerla limpia y equilibrada.

Perfecto para quienes buscan protección natural, frescura y bienestar emocional en su día a día.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Bergamota

DESCRIPCION:
 ACEITE ESENCIAL DE BERGAMOTA
• El aroma del optimismo• • Eleva el ánimo y disipa la ansiedad

El aceite esencial de Bergamota es un poderoso aliado para el equilibrio emocional:
 Estimula la alegría y el bienestar
 Reduce el estrés, la tensión y los pensamientos negativos
 Ayuda en casos de insomnio, depresión y ansiedad leve
 Refresca la mente y armoniza el sistema nervioso
? Ideal para aromaterapia, masajes emocionales y difusores

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú

PRODUCTO: Lápiz de Reflexología

DESCRIPCION:
 Lápiz Digitopresor de Reflexología
• Precisión y alivio en tus manos!

 Herramienta de madera natural para estimular puntos reflexológicos y de acupuntura.
• útil también para activar puntos gatillo.

? Beneficios:
? Estimula zonas reflejas del pie.
? Ergonómico y fácil de usar.
? Alivio muscular sin necesidad de agujas.

 Haz tu pedido al 930830427
 Delivery en todo el país

PRODUCTO: Digitopresor Thera Press

DESCRIPCION:
Thera Press

 Thera Press, herramienta de PVC azul para masajes profundos.
 Relaja puntos gatillo, mejora la flexibilidad muscular y promueve la vascularización.
? Ligero, ergonómico y efectivo para terapias.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Lapiz digitopresor de reflexología (Acrilico)

DESCRIPCION:
 Lápiz Digitopresor de Reflexología
• Precisión y alivio en tus manos!

 Herramienta de madera natural para estimular puntos reflexológicos y de acupuntura.
• útil también para activar puntos gatillo.

? Beneficios:
? Estimula zonas reflejas del pie.
? Ergonómico y fácil de usar.
? Alivio muscular sin necesidad de agujas.

 Haz tu pedido al 930830427
 Delivery en todo el país

PRODUCTO: PIEDRAS CALIENTES (X16U)

DESCRIPCION:
 Kit de piedras calientes • 16 Unidades

Set ideal para masajes de relajación y alivio muscular, hecho con basalto natural y potencia de 60W, alcanzando hasta 60°C 10°C.

? Beneficios:

 Relajación profunda y reducción del estrés
 Alivia tensiones y contracturas
 Mejora la circulación sanguínea
 Experiencia de spa en casa o en centros de masajes

Perfecto para masajes terapéuticos y profesionales con resultados visibles desde la primera sesión.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: KIT DE VENTOSAS DE VIDRIO

DESCRIPCION:
 Kit de Ventosas de Vidrio

Todo lo que necesitas para terapia de ventosas y bienestar facial en un solo paquete.

? Incluye:

 12 ventosas de vidrio
 Pomo aceitero
 Ventosas faciales
 Aceite de rosa mosqueta
 Lámina de acupuntura

Perfecto para quienes buscan relajación, cuidado facial y terapia profesional en casa o en el consultorio.

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú
 Revisa el producto en el siguiente enlace

https://youtu.be/7zxIj6uwbEc?si=NdLkrpEnG2ueQC_r
https://youtu.be/7zxIj6uwbEc
https://youtu.be/1MCt6E6dC6g

PRODUCTO: PIEDRAS CALIENTES 20 pzs

DESCRIPCION:
 Maleta de Piedras Calientes • 20 Unidades

 Maleta completa con 20 piedras calientes de diferentes tamaños, perfecta para masajes terapéuticos y relajantes.

 Calentador integrado para mantener la temperatura ideal y mayor comodidad durante las sesiones.
 Ideal para aliviar tensiones, contracturas y estrés, ofreciendo una experiencia de spa profesional en casa o en tu centro de masajes.

 Más información: consulta la descripción del video en el siguiente enlace.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Almohada viscoelástica

DESCRIPCION:
 Almohada Viscoelástica con Gel ?

 Descansa mejor, despierta renovado
Diseñada para alinear correctamente tu columna durante el sueño, reduciendo tensión en cuello y hombros.

El gel incorporado ayuda a regular la temperatura, evitando el exceso de calor y favoreciendo un sueño más profundo y reparador.

? Mejora la postura cervical.
? Reduce dolores musculares y rigidez.
? Ideal para personas con insomnio o estrés.

 Stock disponible

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Almohada ortopédica con doble curva

DESCRIPCION:
 Almohada Ortopédica con Curva para el Cuello

 Tu cuello en la posición perfecta toda la noche
Diseñada con forma ergonómica que sostiene la curvatura natural cervical, reduciendo la presión en vértebras y másculos.

Ideal para prevenir dolores de cuello, rigidez matutina y mejorar la respiración nocturna.

? Alinea columna y cuello.
? Reduce tensión y contracturas.
? Favorece la relajación muscular.

 Disponible para entrega inmediata

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: PLANTILLA DE MEMORY FOAM

DESCRIPCION:
 Plantillas Memory Foam • Máximo Confort

 Absorben el impacto, distribuyen el peso y reducen el dolor.
Perfectas para deportistas y personas con:

Pie plano
Fascitis plantar
Cansancio en los pies
Deportistas

 Tallas disponibles: 35 - 43
 OFERTA ESPECIAL: S/35.00

 Pedidos al por mayor y menor al 930830427
 Hacemos envíos a todo el Perú
 Revisa el producto en el siguiente enlace:

https://youtu.be/cgcRGhY0U1k?si=NRDYSsR3MlUxrKIV

PRODUCTO: Traccionador Cervical

DESCRIPCION:
 Traccionador Cervical
• Relaja, ajusta y alivia!

 Ideal para personas con dolor de cuello, cefaleas, mala postura o estrés cervical.

 Beneficios:
? Alivio inmediato de presión vertebral
? Mejora la postura
? Reduce tensión muscular
? Portátil y ajustable

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Férula en gancho

DESCRIPCION:
 Férulas Digitales • Protege tus dedos con confianza
• Fractura, tendinitis o esguince de dedos

 Tenemos férulas digitales para:
? Fracturas
? Lesiones por impacto
? Esguinces
? Rehabilitación en casa

 Incluye tutorial digital con indicaciones de uso.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Férula en resorte

DESCRIPCION:
 Férulas Digitales • Protege tus dedos con confianza
• Fractura, tendinitis o esguince de dedos

 Tenemos férulas digitales para:
? Fracturas
? Lesiones por impacto
? Esguinces
? Rehabilitación en casa

 Incluye tutorial digital con indicaciones de uso.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Férula en sandalia

DESCRIPCION:
 Férulas Digitales • Protege tus dedos con confianza
• Fractura, tendinitis o esguince de dedos

 Tenemos férulas digitales para:
? Fracturas
? Lesiones por impacto
? Esguinces
? Rehabilitación en casa

 Incluye tutorial digital con indicaciones de uso.

 Envío a todo el Perú
 Pedidos al: 930830427

PRODUCTO: Aceite esencial de Rosas

DESCRIPCION:
 Aceite Esencial de Rosas • El Aroma del Amor y Autoestima

El aceite esencial de rosas es reconocido por su aroma floral, dulce y elegante, altamente valorado en aromaterapia y perfumería por sus propiedades relajantes y estimulantes del bienestar emocional.

? Beneficios principales:

 Favorece el equilibrio emocional, ayudando a reducir la ansiedad y el estrés.
 Promueve la relajación y la calma, ideal para momentos de tranquilidad.
 Cuidado de la piel, ayudando a hidratarla y mantenerla suave y luminosa.
 Propiedades afrodisíacas, estimulando sensaciones de romanticismo y cercanía.
 Aromatiza espacios, creando un ambiente acogedor y armonioso.

Perfecto para quienes buscan bienestar emocional, cuidado natural y un aroma exquisito en su día a día.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Jazmín

DESCRIPCION:
 Aceite Esencial de Jazmín • El Aroma de la Confianza y Sensualidad

El aceite esencial de jazmín es conocido por su aroma intenso, floral y exótico, apreciado en aromaterapia y perfumería por sus propiedades relajantes y estimulantes del bienestar emocional.

? Beneficios principales:

 Ayuda a reducir el estrés y la ansiedad, promoviendo calma y equilibrio emocional.
 Favorece el bienestar emocional, aportando sensación de alegría y armonía.
 Propiedades afrodisíacas, estimulando la sensualidad y la conexión emocional.
? Cuidado de la piel, contribuyendo a mantenerla suave y radiante.
 Aromatiza espacios, creando un ambiente elegante, cálido y relajante.

Ideal para quienes buscan equilibrio emocional, relajación y un aroma floral exótico en su día a día.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Lemongrass

DESCRIPCION:
 Aceite Esencial de Lemon grass • El Aroma del Enfoque y Desintoxicación Mental

El aceite esencial de lemon grass se destaca por su aroma cítrico, fresco y revitalizante, muy apreciado en aromaterapia y cuidado personal por sus propiedades refrescantes y estimulantes.

? Beneficios principales:

 Promueve la relajación y reduce el estrés, ayudando a equilibrar la mente y el cuerpo.
 Revitaliza y energiza, ideal para combatir la fatiga y aumentar la concentración.
 Cuidado de la piel, ayudando a mantenerla fresca y limpia.
 Aromatiza espacios, generando un ambiente fresco y estimulante.
 Efecto repelente natural, útil para alejar insectos de manera segura.

Perfecto para quienes buscan bienestar, frescura y energía natural en su rutina diaria.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Cypress

DESCRIPCION:
 Aceite Esencial de Cypress • El Aroma del Enraizamiento y Transición

El aceite esencial de Cypress es reconocido por su aroma fresco, amaderado y equilibrante, muy valorado en aromaterapia y cuidado personal por sus propiedades relajantes y revitalizantes.

? Beneficios principales:

 Ayuda a reducir el estrés y la ansiedad, promoviendo calma y bienestar emocional.
 Estimula la energía y la vitalidad, ideal para combatir la fatiga.
 Cuidado de la piel, ayudando a tonificar y equilibrar la piel grasa o con imperfecciones.
 Aromatiza espacios, creando un ambiente fresco, limpio y armonioso.
 Favorece la relajación muscular, ideal para masajes después de la actividad física.

Perfecto para quienes buscan equilibrio emocional, energía natural y cuidado personal en su rutina diaria.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Eucalipto

DESCRIPCION:
 Aceite Esencial de Eucalipto • El Aroma del Alivio y Respiración Emocional

El aceite esencial de eucalipto se caracteriza por su aroma fresco, penetrante y revitalizante, muy valorado en aromaterapia y cuidado personal por sus propiedades refrescantes, descongestionantes y energizantes.

? Beneficios principales:

 Favorece la respiración, ayudando a despejar las vías respiratorias y mejorar la sensación de frescura.
 Reduce el estrés y la fatiga, promoviendo bienestar físico y mental.
 Alivia másculos y articulaciones, ideal para masajes relajantes después de la actividad física.
 Purifica y aromatiza espacios, generando un ambiente fresco y limpio.
 Cuidado de la piel, contribuyendo a mantenerla limpia y equilibrada.

Perfecto para quienes buscan energía, frescura y bienestar natural en su día a día.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO:Aceite esencial de Ylang Ylang

DESCRIPCION:
 Aceite Esencial de Ylang Ylang • El Aroma del Placer y Relajación

El aceite esencial de ylang ylang es reconocido por sus propiedades calmantes, relajantes y equilibrantes. Su aroma floral y dulce lo convierte en un ingrediente muy valorado en aromaterapia, cuidado personal y perfumería.

 Reducir el estrés y la ansiedad
 Mejorar el bienestar emocional
? Cuidar la piel y el cabello (regula la grasa y aporta brillo)
 Estimular la libido
 Perfumar naturalmente gracias a su fragancia dulce y exótica.

 Información del producto
 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO:Aceite esencial de Romero

DESCRIPCION:
 Aceite Esencial de Romero • El Aroma de la Fuerza y Coraje

El aceite esencial de romero es muy valorado por su aroma herbal, fresco y estimulante. Tradicionalmente se utiliza en aromaterapia y cuidado personal por sus propiedades revitalizantes que ayudan a mejorar el bienestar físico y mental.

? Beneficios principales:

 Favorece la concentración y la memoria.
 Cuidado del cabello.
 Reduce la sensación de cansancio.
 Ideal para masajes.
 Aromatiza y purifica espacios.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO:Aceite esencial de Melissa

DESCRIPCION:
 Aceite Esencial de Melissa • El Aroma de la Paz Emocional

El aceite esencial de melisa es apreciado por su aroma suave, fresco y ligeramente cítrico, conocido por sus propiedades relajantes y equilibrantes. Es muy utilizado en aromaterapia para promover la calma y el bienestar emocional.

? Beneficios principales:

 Ayuda a reducir el estrés y la ansiedad, promoviendo una sensación de calma.
 Favorece el equilibrio emocional y el bienestar mental.
 Apoya la relajación y el descanso, ideal para momentos de tranquilidad.
? Cuidado de la piel, ayudando a mantenerla fresca y equilibrada.
 Aromatiza los espacios, creando un ambiente armonioso y relajante.

Gracias a su aroma delicado y sus propiedades calmantes, el aceite esencial de melisa es ideal para quienes buscan relajación, equilibrio y bienestar natural.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Menta

DESCRIPCION:
 Aceite Esencial de Menta • El Aroma de la Claridad

El aceite esencial de menta se caracteriza por su aroma fresco, intenso y revitalizante. Es muy utilizado en aromaterapia y cuidado personal por su capacidad para refrescar, estimular la mente y brindar sensación de alivio.

? Beneficios principales:

 Estimula la concentración y la claridad mental, ayudando a mantener la mente despierta.
 Proporciona una sensación refrescante, ideal para momentos de cansancio o calor.
 Alivia la tensión y la fatiga, especialmente en masajes aromáticos.
 Aporta sensación de frescura respiratoria gracias a su aroma mentolado.
 Aromatiza espacios, creando un ambiente fresco y energizante.

Gracias a su efecto refrescante y estimulante, el aceite esencial de menta es ideal para quienes buscan energía, claridad mental y bienestar natural.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427

PRODUCTO: Aceite esencial de Lavanda

DESCRIPCION:
 Aceite Esencial de Lavanda • El Aroma de la Calma Profunda

El aceite esencial de lavanda es uno de los más populares en aromaterapia, gracias a su aroma suave, floral y relajante. Es conocido por ayudar a crear una sensación de calma, equilibrio y bienestar.

? Beneficios principales:

 Ayuda a reducir el estrés y la ansiedad, promoviendo la relajación.
 Favorece el descanso y el sueño, ideal para usar antes de dormir.
 Equilibra las emociones y aporta tranquilidad.
? Cuidado de la piel, ayudando a mantenerla suave y equilibrada.
 Aromatiza espacios, creando un ambiente relajante y armonioso.

Gracias a sus múltiples beneficios, el aceite esencial de lavanda es perfecto para quienes buscan relajación, descanso y bienestar natural.

 Presentación: Frasco gotero o roll-on
 Contenido: 10 ml
 Marca: Amazonik

 Envío a todo el Perú
 Pedidos: 930830427 | 930830427
`;
        function buildModalDescriptionOverridesMap() {
            const overrides = {};
            const regex =
                /PRODUCTO:\s*([^\n]+)\n+[\s\S]*?DESCRIPCION:\s*([\s\S]*?)(?=\nPRODUCTO:|$)/g;
            let match;
            while ((match = regex.exec(PRODUCT_MODAL_DESCRIPTION_RAW))) {
                const name = String(match[1] || "").trim();
                const description = String(match[2] || "").trim();
                if (name && description) {
                    overrides[name] = description;
                    overrides[slugify(name)] = description;
                }
            }
            return overrides;
        }
        const PRODUCT_MODAL_DESCRIPTION_OVERRIDES =
            buildModalDescriptionOverridesMap();
        function cleanModalOverrideText(text) {
            return String(text || "")
                    .replace(/\r/g, "")
                    .split("\n")
                    .map((line) => line.trimEnd())
                    .filter((line) => !/^\d+$/.test(line.trim()))
                    .join("\n")
                    .replace(/\n{3,}/g, "\n\n")
                    .trim();
        }
        function buildModalOverrideBlocks(text) {
            return cleanModalOverrideText(text)
                .split(/\n\s*\n+/)
                .map((block) => block.trim())
                .filter(Boolean);
        }
        function inferModalOverrideSummary(text) {
            const lines = cleanModalOverrideText(text)
                .split("\n")
                .map((line) => line.trim())
                .filter(
                    (line) =>
                        line &&
                        !/^https?:\/\//i.test(line) &&
                        !isBulletLine(line),
                );
            if (!lines.length) {
                return "Información detallada disponible en la vista rápida.";
            }
            const first = lines[0];
            const second = lines[1] && lines[1].length <= 100 ? lines[1] : "";
            const combined = [first, second].filter(Boolean).join(" ");
            return combined.length <= 160
                ? combined
                : `${first.slice(0, 157).trim()}...`;
        }
        function applyModalDescriptionOverride(product) {
            const override =
                PRODUCT_MODAL_DESCRIPTION_OVERRIDES[product.nombre] ||
                PRODUCT_MODAL_DESCRIPTION_OVERRIDES[slugify(product.nombre)];
            if (!override || !String(override).trim()) return product;
            return {
                ...product,
                modalDescripcionCompleta: cleanModalOverrideText(override),
                modalDescripcionBloques: buildModalOverrideBlocks(override),
                modalDescripcionResumen: inferModalOverrideSummary(override),
                modalHighlights: [],
            };
        }
        function normalizeProduct(product) {
            const categoria = normalizeCategory(product.categoria);
            const imageOverride = imageOverrideForProduct(product);
            const imageHoverOverride = hoverImageOverrideForProduct(product);
            const mediaClassOverride = mediaClassOverrideForProduct(product);
            return {
                ...product,
                nombre: product.nombre,
                categoria,
                categoriaOrden: Number(product.categoriaOrden) || 999,
                pagina: Number(product.pagina) || 0,
                highlights: arrayFrom(product.highlights)
                    .map((item) => String(item).trim())
                    .filter(Boolean),
                descripcionBloques: arrayFrom(product.descripcionBloques)
                    .map((item) => String(item).trim())
                    .filter(Boolean),
                descripcionCompleta: 
                    String(product.descripcionCompleta || "".trim(),
                ),
                descripcionResumen:
                    String(product.descripcionResumen || "").trim() ||
                    "Información detallada disponible en la vista rápida.",
                imagen:
                    imageOverride || product.imagen || imageForCategory(categoria),
                imagenHover: imageHoverOverride || "",
                mediaClass: mediaClassOverride || "",
            };
        }
        const EXCLUDED_PRODUCT_NAMES = new Set([
            "LÁMINA DE AURICULOTERAPIA",
            "Lamina de Auriculoterapia (3)",
        ]);
        const PRODUCTS = (window.PRODUCTS_DATA || [])
            .filter(
                (product) =>
                    !EXCLUDED_PRODUCT_NAMES.has(String(product.nombre || "").trim()),
            )
            .map(normalizeProduct)
            .map(applyModalDescriptionOverride)
            .sort((a, b) => {
                const orderDiff = a.categoriaOrden - b.categoriaOrden;
                if (orderDiff !== 0) return orderDiff;
                return String(a.nombre).localeCompare(String(b.nombre), "es");
            });
        const productById = new Map(
            PRODUCTS.map((product) => [String(product.id), product]),
        );
        const categories = [
            { value: "todas", label: "Todas las categorías", order: 0 },
        ].concat(
            Array.from(
                new Map(
                    PRODUCTS.map((product) => [
                        product.categoria,
                        {
                            value: product.categoria,
                            label: product.categoria,
                            order: product.categoriaOrden,
                        },
                    ]),
                ).values(),
            ).sort(
                (a, b) => a.order - b.order || a.label.localeCompare(b.label, "es"),
            ),
        );
        function whatsappLink(product) {
            const lines = [
                "Hola, quiero información sobre este producto de Agujas Acupuntura:",
                "",
                `*Producto:* ${product.nombre}`,
                `*Precio:* ${product.precioTexto}`,
                `*Categoría:* ${product.categoria}`,
                `*Página del catálogo:* ${product.pagina ? `Página ${product.pagina}` : "Sin referencia"}`,
                `*Enlace:* ${product.url || "Sin enlace"}`,
            ];
            return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
        }
        function searchableText(product) {
            return slugify(
                [
                    product.nombre,
                    product.categoria,
                    product.descripcionResumen,
                    product.modalDescripcionCompleta || product.descripcionCompleta,
                    product.url,
                    `pagina ${product.pagina}`,
                ].join(" "),
            );
        }
        function renderCategorySelect() {
            els.categorySelect.innerHTML = categories
                .map(
                    (category) =>
                        `<option value="${esc(category.value)}">${esc(category.label)}</option>`,
                )
                .join("");
        }
        function filteredProducts() {
            let list = [...PRODUCTS];
            const term = slugify(state.search.trim());
            if (term) {
                list = list.filter((product) =>
                    searchableText(product).includes(term),
                );
            }
            if (state.category !== "todas") {
                list = list.filter((product) => product.categoria === state.category);
            }
            return list;
        }
        function paginationModel(totalPages, currentPage) {
            if (totalPages <= 7)
                return Array.from({ length: totalPages }, (_, i) => i + 1);
            const model = [1];
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            if (start > 2) model.push("...");
            for (let i = start; i <= end; i += 1) model.push(i);
            if (end < totalPages - 1) model.push("...");
            model.push(totalPages);
            return model;
        }
        function presentableHighlights(product) {
            const clean = product.highlights
                .map((item) =>
                    
                        item.replace(/^[^A-Za-z0-9]+/, "".trim(),
                    ),
                )
                .filter((item) => item && !item.endsWith(":"));
            if (clean.length) return clean;
            const derived = [];
            product.descripcionBloques.forEach((block) => {
                String(block || "")
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean)
                    .forEach((line) => {
                        if (!isBulletLine(line)) return;
                        const normalized = stripBullet(line);
                        if (
                            !normalized ||
                            normalized.endsWith(":") ||
                            derived.includes(normalized)
                        )
                            return;
                        derived.push(normalized);
                    });
            });
            return derived;
        }
        function renderActivePills(total) {
            const pills = [];
            if (state.search.trim()) pills.push(`Búsqueda: ${state.search.trim()}`);
            if (state.category !== "todas")
                pills.push(`Categoría: ${state.category}`);
            els.activePills.innerHTML = pills.length
                ? pills
                    .map((text) => `<span class="pill">${esc(text)}</span>`)
                    .join("")
                : '<span class="pill">Catálogo actualizado de productos</span>';
            els.summaryPill.textContent = `Productos visibles: ${total}`;
        }
        function buildCard(product) {
            const productName = product.nombre;
            const productCategory = product.categoria;
            const productSummary = product.descripcionResumen;
            const productPrice = product.precioTexto;
            const hoverImage = product.imagenHover
                ? `<img class="media-img media-img-hover" src="${esc(product.imagenHover)}" alt="${esc(productName)} vista alternativa" loading="lazy" decoding="async">`
                : "";
            return `
    <article class="card">
      <div class="media ${product.imagenHover ? "has-hover" : ""} ${product.mediaClass || ""}">
        <img class="media-img media-img-main" src="${esc(product.imagen)}" alt="${esc(productName)}" loading="lazy" decoding="async">
        ${hoverImage}
        <div class="badges">
          <span class="badge">${esc(productCategory)}</span>
        </div>
      </div>
      <div class="body">
        <h3 class="title">${esc(productName)}</h3>
        <p class="desc">${esc(productSummary)}</p>
        <div class="price-block"><strong>${esc(productPrice)}</strong><small>${esc(`Categoría: ${productCategory}`)}</small></div>
        <div class="card-actions">
          <button type="button" class="btn-card btn-quick" data-quick="${esc(product.id)}"><span class="material-symbols-outlined text-[18px]">visibility</span>Vista rápida</button>
          <a class="btn-card btn-buy" href="${whatsappLink(product)}" target="_blank" rel="noopener"><span class="material-symbols-outlined text-[18px]">shopping_bag</span>Comprar ahora</a>
        </div>
      </div>
    </article>`;
        }
        function renderProducts() {
            const list = filteredProducts();
            const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
            if (state.page > totalPages) state.page = totalPages;
            const start = (state.page - 1) * PAGE_SIZE;
            const visible = list.slice(start, start + PAGE_SIZE);
            const from = list.length ? start + 1 : 0;
            const to = list.length ? Math.min(start + PAGE_SIZE, list.length) : 0;
            els.resultsTitle.textContent = `${list.length} producto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;
            els.resultsSubtitle.textContent = list.length
                ? `Visualizando ${from}-${to} de ${list.length} productos sincronizados.`
                : "No hay resultados.";
            renderActivePills(list.length);
            if (!list.length) {
                els.productsGrid.innerHTML = "";
                els.emptyState.style.display = "block";
                els.pagination.innerHTML = "";
                return;
            }
            els.emptyState.style.display = "none";
            els.productsGrid.innerHTML = visible.map(buildCard).join("");
            qsa("[data-quick]").forEach((btn) =>
                btn.addEventListener("click", () =>
                    openModal(productById.get(String(btn.dataset.quick))),
                ),
            );
            const model = paginationModel(totalPages, state.page);
            els.pagination.innerHTML =
                totalPages <= 1
                    ? ""
                    : `
    <button type="button" class="page-btn" data-page="${state.page - 1}" ${state.page === 1 ? "disabled" : ""}>&lsaquo;</button>
    ${model
                        .map((item) =>
                            item === "..."
                                ? '<span class="dots">...</span>'
                                : `<button type="button" class="page-btn ${item === state.page ? "active" : ""}" data-page="${item}">${item}</button>`,
                        )
                        .join("")}
    <button type="button" class="page-btn" data-page="${state.page + 1}" ${state.page === totalPages ? "disabled" : ""}>&rsaquo;</button>`;
            qsa("#pagination [data-page]").forEach((btn) =>
                btn.addEventListener("click", () => {
                    const next = Number(btn.dataset.page);
                    if (next >= 1 && next <= totalPages) {
                        state.page = next;
                        renderProducts();
                        window.scrollTo({
                            top: document.getElementById("catalogo").offsetTop - 12,
                            behavior: "smooth",
                        });
                    }
                }),
            );
        }
        function isBulletLine(line) {
            return /^[^A-Za-z0-9áéíóúÁÉÍÓÚñÑüÜ(]/.test(line);
        }
        function stripBullet(line) {
            return line.replace(/^[^A-Za-z0-9áéíóúÁÉÍÓÚñÑüÜ(]+/, "").trim();
        }
        function renderDetailBlock(block) {
            const lines = String(block || "")
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);
            if (!lines.length) return "";
            if (lines.every(isBulletLine)) {
                return `<ul class="detail-list">${lines.map((line) => `<li>${esc(stripBullet(line))}</li>`).join("")}</ul>`;
            }
            if (
                lines.length > 1 &&
                !isBulletLine(lines[0]) &&
                lines.slice(1).every(isBulletLine)
            ) {
                return `<div><p class="detail-heading">${esc(lines[0])}</p><ul class="detail-list">${lines
                    .slice(1)
                    .map((line) => `<li>${esc(stripBullet(line))}</li>`)
                    .join("")}</ul></div>`;
            }
            return lines.map((line) => `<p>${esc(line)}</p>`).join("");
        }
        function openImageLightbox() {
            if (!els.lightboxImg.src) return;
            els.imageLightbox.classList.add("show");
            els.imageLightbox.setAttribute("aria-hidden", "false");
        }
        function closeImageLightbox() {
            els.imageLightbox.classList.remove("show");
            els.imageLightbox.setAttribute("aria-hidden", "true");
        }
        function openModal(product) {
            if (!product) return;
            const productName = product.nombre;
            const productCategory = product.categoria;
            const productPrice = product.precioTexto;
            const productSummary =
                product.modalDescripcionResumen || product.descripcionResumen;
            els.modalImg.src = product.imagen;
            els.modalImg.alt = productName;
            els.lightboxImg.src = product.imagen;
            els.lightboxImg.alt = productName;
            els.modalTitle.textContent = productName;
            els.modalPrice.textContent = productPrice;
            els.modalSummary.textContent = productSummary;
            els.modalCategory.textContent = productCategory;
            els.modalBuy.href = whatsappLink(product);
            els.openImageLightboxBtn.setAttribute(
                "aria-label",
                `Ver imagen completa de ${productName}`,
            );
            els.modalViewImage.setAttribute(
                "aria-label",
                `Ver imagen completa de ${productName}`,
            );
            els.modalChips.innerHTML = [
                productCategory,
                "Vista rápida",
                "Detalle completo",
            ]
                .map((chip) => `<span class="chip">${esc(chip)}</span>`)
                .join("");
            const highlights = Array.isArray(product.modalHighlights)
                ? product.modalHighlights
                : presentableHighlights(product).slice(0, 3);
            if (highlights.length) {
                els.modalHighlightsWrap.style.display = "block";
                els.modalHighlights.innerHTML = highlights
                    .map((item) => `<li>${esc(item)}</li>`)
                    .join("");
            } else {
                els.modalHighlightsWrap.style.display = "none";
                els.modalHighlights.innerHTML = "";
            }
            const blocks = product.modalDescripcionBloques?.length
                ? product.modalDescripcionBloques
                : product.descripcionBloques.length
                    ? product.descripcionBloques
                    : [
                        product.modalDescripcionCompleta ||
                        product.descripcionCompleta ||
                        product.modalDescripcionResumen ||
                        product.descripcionResumen,
                    ];
            els.modalDetails.innerHTML = blocks.map(renderDetailBlock).join("");
            closeImageLightbox();
            els.modal.classList.add("show");
            els.modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        }
        function closeModal() {
            closeImageLightbox();
            els.modal.classList.remove("show");
            els.modal.setAttribute("aria-hidden", "true");
            document.body.style.overflow = "";
        }
        function bindEvents() {
            const desktopCoursesToggle = qs("#desktopCoursesToggle");
            const desktopCoursesMenu = qs("#desktopCoursesMenu");
            const btnBackNav = qs("#btnBackNav");
            if (btnBackNav) {
                btnBackNav.addEventListener("click", () => {
                    if (window.history.length > 1) {
                        window.history.back();
                    } else {
                        window.location.href = "https://www.agujasacupunturaperu.com/demox";
                    }
                });
            }
            els.searchInput.addEventListener("input", (e) => {
                state.search = e.target.value;
                state.page = 1;
                renderProducts();
            });
            els.categorySelect.addEventListener("change", (e) => {
                state.category = e.target.value;
                state.page = 1;
                renderProducts();
            });
            els.closeModalBtn.addEventListener("click", closeModal);
            els.modal.addEventListener("click", (e) => {
                if (e.target === els.modal) closeModal();
            });
            els.openImageLightboxBtn.addEventListener("click", openImageLightbox);
            els.modalViewImage.addEventListener("click", openImageLightbox);
            els.modalImg.addEventListener("click", openImageLightbox);
            els.closeImageLightboxBtn.addEventListener("click", closeImageLightbox);
            els.imageLightbox.addEventListener("click", (e) => {
                if (e.target === els.imageLightbox) closeImageLightbox();
            });
            document.addEventListener("keydown", (e) => {
                if (
                    e.key === "Escape" &&
                    els.imageLightbox.classList.contains("show")
                ) {
                    closeImageLightbox();
                    return;
                }
                if (e.key === "Escape" && els.modal.classList.contains("show"))
                    closeModal();
            });
        }
        renderCategorySelect();
        bindEvents();
        renderProducts();
