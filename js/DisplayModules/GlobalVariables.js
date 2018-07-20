var BaseCellSize = 32; // Базовая ширина и высота 1 клетки
var baseSize;//Базовый размер клетки
var Ofset; // Сдвиг изображения на холсте(инициализируется в spriteControler)

var LoadResources;//Функция загрузки всех текстур
var readyCallbacks = []; //Массив функций, которые загрузятся после загрузки всех изображений
var IsNeedToDraw=true;//Если true, то вызовется отрисосвка всего мира
///Массивы тесстур
var resourceCache = {};//Все изображения по их url
var getResurse = ()=>{};        // Функция, озвращающая img
var BaseTextures = {}; //Все базовые текстуры(Изображения + их фреймы)

var BaseSprites = {}; //Все базовые спрайты(Тексуры с выбранным фреймом)
var getBaseSprite = ()=>{}; //Функция, озвращающая базовые текстуры

var FloorsArray = [];          //Массив разноцветных полов
var WallsArray = [];          //Массив разноцветных стен
var HeroesTextureArray =[]; //Массив моделек героев
