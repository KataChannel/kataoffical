import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateCustomers() {
  const customers = [
    {
        "roleNames": ["User"],
        "phone": "0922504411",
        "SDT": "0922504411",
        "email": "touyen.ceo@tazagroup.vn"
    },
    {
        "roleNames": ["User"],
        "phone": "0914305431",
        "SDT": "0914305431",
        "email": "thanh.nguyen.tzg@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0398598295",
        "SDT": "0398598295",
        "email": "kieuoanh.bdh.tazagroup@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0935670135",
        "SDT": "0935670135",
        "email": "myduyen.cgo@tazagroup.vn"
    },
    {
        "roleNames": ["User"],
        "phone": "0336748715",
        "SDT": "0336748715",
        "email": "troly.ptgd@tazagroup.vn"
    },
    {
        "roleNames": ["User"],
        "phone": "0947900111",
        "SDT": "0947900111",
        "email": "troly.ceotazagroup@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0379499416",
        "SDT": "0379499416",
        "email": "phaply@tazagroup.vn "
    },
    {
        "roleNames": ["User"],
        "phone": "0356328596",
        "SDT": "0356328596",
        "email": "baotrisuachuataza@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0878007660",
        "SDT": "0878007660",
        "email": "hoangminhluong229@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0393738437",
        "SDT": "0393738437",
        "email": "tranngoc99lkt@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0981646387",
        "SDT": "0981646387",
        "email": "nguyenbatuan260696@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0357884757",
        "SDT": "0357884757",
        "email": "hoanghac27@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0333945908",
        "SDT": "0333945908",
        "email": "Ketoan@tazagroup.vn"
    },
    {
        "roleNames": ["User"],
        "phone": "0966039287",
        "SDT": "0966039287",
        "email": "ketoantaza@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "039 3326009",
        "SDT": "039 3326009",
        "email": "vovanvo.6786@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0329022322",
        "SDT": "0329022322",
        "email": "dangtranhuuhieu@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0934031423",
        "SDT": "0934031423",
        "email": "tranthikimngont@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0332779006",
        "SDT": "0332779006",
        "email": "hoangbaohan141197@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0961652766",
        "SDT": "0961652766",
        "email": "minhnhut120895@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0915490248",
        "SDT": "0915490248",
        "email": "diepchauthi@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0816142521",
        "SDT": "0816142521",
        "email": "dungphamttytta@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0834117613",
        "SDT": "0834117613",
        "email": "lingho104@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0763168949",
        "SDT": "0763168949",
        "email": "trucuyen.coach@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0972897167",
        "SDT": "0972897167",
        "email": "mai679191@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0964554140",
        "SDT": "0964554140",
        "email": "ngan45900@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0798680725",
        "SDT": "0798680725",
        "email": "anhanhthu0725@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0796547775",
        "SDT": "0796547775",
        "email": "huynhanhthu110901@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0968976181",
        "SDT": "0968976181",
        "email": "nhatsang.rtc2@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0981919946",
        "SDT": "0981919946",
        "email": "sam.nts.267@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0921244626 ",
        "SDT": "0921244626 ",
        "email": "phamthongpeter@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0977272967",
        "SDT": "0977272967",
        "email": "chikiet88@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0772669817",
        "SDT": "0772669817",
        "email": "phuonglinh01051@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0398458841 ",
        "SDT": "0398458841 ",
        "email": "buitruongbichthao0807@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0702640974",
        "SDT": "0702640974",
        "email": "meotifun@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0928418413",
        "SDT": "0928418413",
        "email": "daolenhuquynh01@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0559802966",
        "SDT": "0559802966",
        "email": "nhubisart@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0367401481",
        "SDT": "0367401481",
        "email": "leadersoltaza.cgo@tazagroup.vn "
    },
    {
        "roleNames": ["User"],
        "phone": "0934613853",
        "SDT": "0934613853",
        "email": "nvy25146@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0982946854",
        "SDT": "0982946854",
        "email": "thien08051005@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0389966663",
        "SDT": "0389966663",
        "email": "kimduyen210394@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0933443671",
        "SDT": "0933443671",
        "email": "nguyenlethanhtuyen2811@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0932683716",
        "SDT": "0932683716",
        "email": "quynhnhune@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0368042678",
        "SDT": "0368042678",
        "email": "thoa.hcm279@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0971719800",
        "SDT": "0971719800",
        "email": "baoduy1065@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0975249841",
        "SDT": "0975249841",
        "email": "caothiminhthuy2002@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0933613564",
        "SDT": "0933613564",
        "email": "loi431992@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0362641820",
        "SDT": "0362641820",
        "email": "phanlequynhnhi1800@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0385830015",
        "SDT": "0385830015",
        "email": "thutrang070398@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0975800643",
        "SDT": "0975800643",
        "email": "buinhu29300@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0702576730",
        "SDT": "0702576730",
        "email": "Linhc11a7@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0786810434",
        "SDT": "0786810434",
        "email": "leadercskh.cgo@tazagroup.vn "
    },
    {
        "roleNames": ["User"],
        "phone": "0392727603",
        "SDT": "0392727603",
        "email": "foxmelanie77@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0792680570",
        "SDT": "0792680570",
        "email": "tientien.lugau@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0908625723",
        "SDT": "0908625723",
        "email": "anhtuyet090397@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0392537285",
        "SDT": "0392537285",
        "email": "phaminhnhat123654@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0354108997",
        "SDT": "0354108997",
        "email": "trangtran06042k@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0336959580",
        "SDT": "0336959580",
        "email": "lananhmai98@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0964415097",
        "SDT": "0964415097",
        "email": "vuong22022003@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0979673527",
        "SDT": "0979673527",
        "email": "vytong2626@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0984545120",
        "SDT": "0984545120",
        "email": "ntdiemmy0412@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0936503886",
        "SDT": "0936503886",
        "email": "nguyenthanhpt86@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0349906856",
        "SDT": "0349906856",
        "email": "hoangbichluan299@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0362024209",
        "SDT": "0362024209",
        "email": "duonghuong305@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0374090784",
        "SDT": "0374090784",
        "email": "dquynh604@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0974391985",
        "SDT": "0974391985",
        "email": "erikanguyen1985@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0935032887",
        "SDT": "0935032887",
        "email": "tram.tranvubich@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0909431397",
        "SDT": "0909431397",
        "email": "anhnguyet.9403@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384977236",
        "SDT": "0384977236",
        "email": "Phuonganh245307759@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0708575795",
        "SDT": "0708575795",
        "email": "kimngan.28112000@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0344569520",
        "SDT": "0344569520",
        "email": "ngan.0706522336@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0826069609",
        "SDT": "0826069609",
        "email": "phuongkieu8499@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0375682852",
        "SDT": "0375682852",
        "email": "lethithuthao061@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0588406981",
        "SDT": "0588406981",
        "email": "hueaingoctram@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0862465358",
        "SDT": "0862465358",
        "email": "letram6411@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0399077728",
        "SDT": "0399077728",
        "email": "thuytien611202@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0386352146",
        "SDT": "0386352146",
        "email": "luuhoangkhanhchi@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0346228265",
        "SDT": "0346228265",
        "email": "xuan.0346228265@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0907145229",
        "SDT": "0907145229",
        "email": "lethicamhuong2812@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0901308102",
        "SDT": "0901308102",
        "email": "thanhtam882009@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0938369286",
        "SDT": "0938369286",
        "email": ""
    },
    {
        "roleNames": ["User"],
        "phone": "0968230939",
        "SDT": "0968230939",
        "email": "ellyvannam@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0933084462",
        "SDT": "0933084462",
        "email": "trinhltt172@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0943029891",
        "SDT": "0943029891",
        "email": "ttothuy08@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384329804",
        "SDT": "0384329804",
        "email": "nguyenxuank26@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0818394293 ",
        "SDT": "0818394293 ",
        "email": "chuc030495@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0374242747",
        "SDT": "0374242747",
        "email": "hoanghafb07@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0376645012",
        "SDT": "0376645012",
        "email": "ptnt2508@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0932189586",
        "SDT": "0932189586",
        "email": "ngothienkyduyen586@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0398076792",
        "SDT": "0398076792",
        "email": "985tranthithanhnhan@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0352653651",
        "SDT": "0352653651",
        "email": "phamthihoanha13@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0386066738",
        "SDT": "0386066738",
        "email": "thuyhang20899@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0393136104",
        "SDT": "0393136104",
        "email": "vuthithuhakrn199@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384417422",
        "SDT": "0384417422",
        "email": "tazaspavinh@gmail.com "
    },
    {
        "roleNames": ["User"],
        "phone": "0946322247",
        "SDT": "0946322247",
        "email": "thymeo789@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0901691033",
        "SDT": "0901691033",
        "email": "ktcn.thuduc@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0372728907",
        "SDT": "0372728907",
        "email": "duyenpham260798@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0387279059",
        "SDT": "0387279059",
        "email": "dokimthuy14724@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0869574041",
        "SDT": "0869574041",
        "email": "lehoai41999@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0795673357",
        "SDT": "0795673357",
        "email": "ngoctrinh12022005@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0382198174",
        "SDT": "0382198174",
        "email": "hieunhu976@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0397831935",
        "SDT": "0397831935",
        "email": "nhih19444@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0982686321",
        "SDT": "0982686321",
        "email": "luonganhngocremy@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0797118444",
        "SDT": "0797118444",
        "email": "hoaivikh@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0928234628",
        "SDT": "0928234628",
        "email": "tranthikimngoc9196@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0908487825",
        "SDT": "0908487825",
        "email": "nguyenthimythuan270798@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0773413918",
        "SDT": "0773413918",
        "email": "nguyenthimyuyen.170802@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384907727",
        "SDT": "384907727",
        "email": "nguyenvutanngoc1199@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0772522323",
        "SDT": "0772522323",
        "email": "myhoa2209@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0793979222",
        "SDT": "0793979222",
        "email": "Thanhvan9222@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0911626678",
        "SDT": "0911626678",
        "email": "tram.kd678@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0972905617",
        "SDT": "0972905617",
        "email": "lthoa47@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0352750154",
        "SDT": "0352750154",
        "email": "baomy27062004@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0815280570",
        "SDT": "0815280570",
        "email": "thihon140305@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0335923176",
        "SDT": "0335923176",
        "email": "lenguyenhongdang93@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0397717214",
        "SDT": "0397717214",
        "email": "thuybinh209@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0337493706",
        "SDT": "0337493706",
        "email": "ngyen221206@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0786224982",
        "SDT": "0786224982",
        "email": "nguyen.tri.cuong97@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0869347872",
        "SDT": "0869347872",
        "email": "ngothingocchi123@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0968569110",
        "SDT": "0968569110",
        "email": "dinhxuanlam949596@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0935665464",
        "SDT": "0935665464",
        "email": "gdcntaza.danang@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0976759239",
        "SDT": "0976759239",
        "email": "gdcntaza.danang@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0326461027",
        "SDT": "0326461027",
        "email": "vantranngocyen7012@gmai.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0394716315",
        "SDT": "0394716315",
        "email": "hanphan215@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0386293945",
        "SDT": "0386293945",
        "email": "queanhh2211@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0779577612",
        "SDT": "0779577612",
        "email": "uyenduongg19122003@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0943117106",
        "SDT": "0943117106",
        "email": "dmquynh207@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384041188",
        "SDT": "0384041188",
        "email": "Annguyen271298@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0899243321",
        "SDT": "0899243321",
        "email": "phuongdang994@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0378115879",
        "SDT": "0378115879",
        "email": "duc47382@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0779697065",
        "SDT": "0779697065",
        "email": "nhij2003@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0775452948",
        "SDT": "0775452948",
        "email": "nguyenthihoa080503@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0905993301",
        "SDT": "0905993301",
        "email": "thuynhung1993@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0822280738",
        "SDT": "0822280738",
        "email": "muoi27032005@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0369731867",
        "SDT": "0369731867",
        "email": " mtkquyen2002@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0775432974",
        "SDT": "0775432974",
        "email": "hiennguyen200302@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0935343160",
        "SDT": "0935343160",
        "email": "nguyenthithutho194@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0814281575",
        "SDT": "0814281575",
        "email": "tranthiyennhitj@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0708094281",
        "SDT": "0708094281",
        "email": "nguyenthigialoc04@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0847026724",
        "SDT": "0847026724",
        "email": "phamhoangkimhue2006@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0394166734",
        "SDT": "0394166734",
        "email": "tuyetdoan3011@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0356759156",
        "SDT": "0356759156",
        "email": "truongnguyet200216@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0795514877",
        "SDT": "0795514877",
        "email": "Mynhung37879@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0768114209",
        "SDT": "0768114209",
        "email": "huynhdieu0046@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0978677218",
        "SDT": "0978677218",
        "email": "nguyenanhnguyen31@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0938657441",
        "SDT": "0938657441",
        "email": "banquanlyhocvien@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0778660336",
        "SDT": "0778660336",
        "email": "bichphambichpham673@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0986545631",
        "SDT": "0986545631",
        "email": "nguyenhang27021999@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0799668740",
        "SDT": "0799668740",
        "email": "minhduyen2022@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0906985508",
        "SDT": "0906985508",
        "email": "hoai2211996@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0988628801",
        "SDT": "0988628801",
        "email": "nguyenlyn0201@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0812098048",
        "SDT": "0812098048",
        "email": "nguyenkhanhlinh2924@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0917007055",
        "SDT": "0917007055",
        "email": "hapebu.nganha@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0379737902",
        "SDT": "0379737902",
        "email": "kimhuyen24052000@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0964391156",
        "SDT": "0964391156",
        "email": "hahang968@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0869692671",
        "SDT": "0869692671",
        "email": "caothitoi734@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0898302234",
        "SDT": "0898302234",
        "email": "banquanlyhocvien@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0907443194",
        "SDT": "0907443194",
        "email": "nptt.thanhthao44@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0373219362",
        "SDT": "0373219362",
        "email": "letamsi20@gmail.com "
    },
    {
        "roleNames": ["User"],
        "phone": "0987188869",
        "SDT": "0987188869",
        "email": "thanh12a4pbc@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0944655045",
        "SDT": "0944655045",
        "email": "nhungpham200713@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0935026319",
        "SDT": "0935026319",
        "email": "nguyenthiphuonguyen1310@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0347512058",
        "SDT": "0347512058",
        "email": "thanhtuyen02011995@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0939013161",
        "SDT": "0939013161",
        "email": "nhuandinh3012@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0987703661",
        "SDT": "0987703661",
        "email": "dinhthituyet30@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0963670067",
        "SDT": "0963670067",
        "email": "nguyenbichhuyen0111@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0965219871",
        "SDT": "0965219871",
        "email": "phamngoctram345@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0397598001",
        "SDT": "0397598001",
        "email": "thuylinhqn1905@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0703136487",
        "SDT": "0703136487",
        "email": "zhukaieng.93@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0934031423",
        "SDT": "0934031423",
        "email": "tranthikimngont@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0962974825",
        "SDT": "0962974825",
        "email": "huynhhoa250896@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0964597445",
        "SDT": "0964597445",
        "email": "tiendeptraibp93@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0966485560",
        "SDT": "0966485560",
        "email": "yenthanhthanh96@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0968474779",
        "SDT": "0968474779",
        "email": "giamdocdaotao@tazagroup.net"
    },
    {
        "roleNames": ["User"],
        "phone": "0933562495",
        "SDT": "0933562495",
        "email": "ttruc0925@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0969951737",
        "SDT": "0969951737",
        "email": "lethitrang2502@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0328233937",
        "SDT": "0328233937",
        "email": "dotrang71bt@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0334714427",
        "SDT": "0334714427",
        "email": "hoaashiii@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0356557851",
        "SDT": "0356557851",
        "email": "trangteddy998@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384784124",
        "SDT": "0384784124",
        "email": "yenlhy24@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0582705206",
        "SDT": "0582705206",
        "email": "camnhung0582705206@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0707232115",
        "SDT": "0707232115",
        "email": "phuongthao.tazaspa@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0766678862",
        "SDT": "0766678862",
        "email": "cungtran623@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0938625991",
        "SDT": "0938625991",
        "email": "tienngocminhsang.pst@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0362132257",
        "SDT": "0362132257",
        "email": "trantien051194@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0563314010",
        "SDT": "0563314010",
        "email": "hoangyphung1997@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0767953959",
        "SDT": "0767953959",
        "email": "xuandoan2402@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0813719717",
        "SDT": "0813719717",
        "email": "thanhmai146202@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0349301394",
        "SDT": "0349301394",
        "email": "tranvanhai.design@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0396925393",
        "SDT": "0396925393",
        "email": "kieunhi2503@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0905782900",
        "SDT": "0905782900",
        "email": "huele.18081995@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0349349190",
        "SDT": "0349349190",
        "email": "thaonhinguyen1603@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0906009507",
        "SDT": "0906009507",
        "email": "hangnguyen.fresel@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0705942491",
        "SDT": "0705942491",
        "email": "thuthaoskd@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0989522287",
        "SDT": "0989522287",
        "email": "ngocyen20012018@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0931923981",
        "SDT": "0931923981",
        "email": "bichphuong.cumgar.1999@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0934002937",
        "SDT": "0934002937",
        "email": "zjnbaby1997@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0388838368",
        "SDT": "0388838368",
        "email": "huynhkimyen1108@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0853535641",
        "SDT": "0853535641",
        "email": "vantai64040@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": " 0888516517",
        "SDT": " 0888516517",
        "email": "phamminhhiencm1986@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0907945095",
        "SDT": "0907945095",
        "email": "thaiduynguyenkg@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0961334434",
        "SDT": "0961334434",
        "email": "huynhbich520@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0933565626",
        "SDT": "0933565626",
        "email": "thuytrang070912@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0963493823",
        "SDT": "0963493823",
        "email": "dminhnhat6320@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0967236409",
        "SDT": "0967236409",
        "email": "thanhloan16110@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0981480461",
        "SDT": "0981480461",
        "email": "nguyentduyen150997@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0349023986",
        "SDT": "0349023986",
        "email": "thaodiomond62@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0944537707",
        "SDT": "0944537707",
        "email": "tranthiminhanh3112@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0908245485",
        "SDT": "0908245485",
        "email": "dnhu2380@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0818968522",
        "SDT": "0818968522",
        "email": "nhatdinhchibi2k@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0866928045",
        "SDT": "0866928045",
        "email": "thuthuy30.10c@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0352068961",
        "SDT": "0352068961",
        "email": "kieuquyen068961@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0869383104",
        "SDT": "0869383104",
        "email": "hongoclananh19@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0707962954",
        "SDT": "0707962954",
        "email": "donguyenlanphuong58@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0878170440",
        "SDT": "0878170440",
        "email": "linhmai2008.mc@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0394814706\n0394414805 - zalo",
        "SDT": "0394814706\n0394414805 - zalo",
        "email": "nhiviolet7979@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0984332369",
        "SDT": "0984332369",
        "email": "vuthikimngan230706@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0399973129",
        "SDT": "0399973129",
        "email": "anvy002@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0325368067",
        "SDT": "0325368067",
        "email": "haithuyhoang98@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0981647912",
        "SDT": "0981647912",
        "email": "thuyhang990212@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0383970939",
        "SDT": "0383970939",
        "email": "trantran111208@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0935989839",
        "SDT": "0935989839",
        "email": "mymieu308@icloud.com"
    },
    {
        "roleNames": ["User"],
        "phone": " 0343132208",
        "SDT": " 0343132208",
        "email": "nb030803@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0963857096",
        "SDT": "0963857096",
        "email": "nlv532003@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0339018820",
        "SDT": "0339018820",
        "email": "votramy1122002@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0905797743",
        "SDT": "0905797743",
        "email": "thaonynguyen9@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0339490593",
        "SDT": "0339490593",
        "email": "hongduyen.231101@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0986438620",
        "SDT": "0986438620",
        "email": "builethithanhthuy@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0345279644",
        "SDT": "0345279644",
        "email": "hoaphuong644@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0917224299",
        "SDT": "0917224299",
        "email": "nguyenthihuynhnhust1995@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0966313616",
        "SDT": "0966313616",
        "email": "anhhoangth1702@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0898981295",
        "SDT": "0898981295",
        "email": "buithikieutrang95@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0798823968",
        "SDT": "0798823968",
        "email": "ttdung410@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0979707872",
        "SDT": "979707872",
        "email": "nguyentienson622000@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0384440125",
        "SDT": "0384440125",
        "email": "ngocthanh170897@gmail.com"
    },
    {
        "roleNames": ["User"],
        "phone": "0983518864",
        "SDT": "0983518864",
        "email": "nguyennhatloan40211@gmail.com"
    }
]

  try {
    // Tạo hoặc lấy vai trò trước
    const rolesMap = new Map<string, string>(); // Lưu trữ name -> id của vai trò
    for (const customer of customers) {
      for (const roleName of customer.roleNames) {
        if (!rolesMap.has(roleName)) {
          let role = await prisma.role.findUnique({ where: { name: roleName } });
          if (!role) {
            role = await prisma.role.create({
              data: { name: roleName },
            });
          }
          rolesMap.set(roleName, role.id);
        }
      }
    }

    // Tạo người dùng với vai trò
    const createdUsers = await Promise.all(
      customers.map(async (customer) => {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: customer.email || undefined },
              { SDT: customer.SDT || undefined },
            ],
          },
        });

        if (existingUser) {
          console.log(`Người dùng ${customer.email || customer.SDT} đã tồn tại`);
          return existingUser;
        }

        return prisma.user.create({
          data: {
            email: customer.email,
            SDT: customer.SDT,
            roles: {
              create: customer.roleNames.map((roleName) => ({
                roleId: rolesMap.get(roleName)!,
              })),
            },
          },
          include: { roles: { include: { role: true } } }, // Trả về thông tin vai trò
        });
      })
    );

    console.log("Đã tạo người dùng:", createdUsers);
    return createdUsers;
  } catch (error) {
    console.error("Lỗi khi tạo người dùng:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Gọi hàm
updateCustomers();