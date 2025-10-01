"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dulieus = [
    {
        "makhold": "C100755",
        "makh": "TG-KS00001"
    },
    {
        "makhold": "C100720",
        "makh": "TG-KS00002"
    },
    {
        "makhold": "C100215",
        "makh": "TG-KS00003"
    },
    {
        "makhold": "C100766",
        "makh": "TG-KS00004"
    },
    {
        "makhold": "C100282",
        "makh": "TG-KS00005"
    },
    {
        "makhold": "C100823",
        "makh": "TG-KS00006"
    },
    {
        "makhold": "C100668",
        "makh": "TG-KS00007"
    },
    {
        "makhold": "C100669",
        "makh": "TG-KS00008"
    },
    {
        "makhold": "C100671",
        "makh": "TG-KS00009"
    },
    {
        "makhold": "C100432",
        "makh": "TG-KS00010"
    },
    {
        "makhold": "C100498",
        "makh": "TG-KS00011"
    },
    {
        "makhold": "C100678",
        "makh": "TG-KS00012"
    },
    {
        "makhold": "C100097",
        "makh": "TG-KS00013"
    },
    {
        "makhold": "C100095",
        "makh": "TG-KS00014"
    },
    {
        "makhold": "C100818",
        "makh": "TG-KS00015"
    },
    {
        "makhold": "C100096",
        "makh": "TG-KS00016"
    },
    {
        "makhold": "C100094",
        "makh": "TG-KS00017"
    },
    {
        "makhold": "C100795",
        "makh": "TG-KS00018"
    },
    {
        "makhold": "C100110",
        "makh": "TG-KS00019"
    },
    {
        "makhold": "C100104",
        "makh": "TG-KS00020"
    },
    {
        "makhold": "C100642",
        "makh": "TG-KS00021"
    },
    {
        "makhold": "C100162",
        "makh": "TG-KS00022"
    },
    {
        "makhold": "C100672",
        "makh": "TG-KS00023"
    },
    {
        "makhold": "C100345",
        "makh": "TG-KS00024"
    },
    {
        "makhold": "C100372",
        "makh": "TG-KS00025"
    },
    {
        "makhold": "C100347",
        "makh": "TG-KS00026"
    },
    {
        "makhold": "C100450",
        "makh": "TG-KS00027"
    },
    {
        "makhold": "C100612",
        "makh": "TG-KS00028"
    },
    {
        "makhold": "C100836",
        "makh": "TG-KS00029"
    },
    {
        "makhold": "C100451",
        "makh": "TG-KS00030"
    },
    {
        "makhold": "C100835",
        "makh": "TG-KS00031"
    },
    {
        "makhold": "C100376",
        "makh": "TG-KS00032"
    },
    {
        "makhold": "C100378",
        "makh": "TG-KS00033"
    },
    {
        "makhold": "C100377",
        "makh": "TG-KS00034"
    },
    {
        "makhold": "C100194",
        "makh": "TG-KS00035"
    },
    {
        "makhold": "C100240",
        "makh": "TG-KS00036"
    },
    {
        "makhold": "C100832",
        "makh": "TG-KS00037"
    },
    {
        "makhold": "C100831",
        "makh": "TG-KS00038"
    },
    {
        "makhold": "C100205",
        "makh": "TG-KS00039"
    },
    {
        "makhold": "C100191",
        "makh": "TG-KS00040"
    },
    {
        "makhold": "C100241",
        "makh": "TG-KS00041"
    },
    {
        "makhold": "C100684",
        "makh": "TG-KS00042"
    },
    {
        "makhold": "C100204",
        "makh": "TG-KS00043"
    },
    {
        "makhold": "C100344",
        "makh": "TG-KS00044"
    },
    {
        "makhold": "C100670",
        "makh": "TG-KS00045"
    },
    {
        "makhold": "C100346",
        "makh": "TG-KS00046"
    },
    {
        "makhold": "C100788",
        "makh": "TG-KS00047"
    },
    {
        "makhold": "C100581",
        "makh": "TG-KS00048"
    },
    {
        "makhold": "C100675",
        "makh": "TG-KS00049"
    },
    {
        "makhold": "C100539",
        "makh": "TG-KS00050"
    },
    {
        "makhold": "C100561",
        "makh": "TG-KS00051"
    },
    {
        "makhold": "C100540",
        "makh": "TG-KS00052"
    },
    {
        "makhold": "C100535",
        "makh": "TG-KS00053"
    },
    {
        "makhold": "C100557",
        "makh": "TG-KS00054"
    },
    {
        "makhold": "C100560",
        "makh": "TG-KS00055"
    },
    {
        "makhold": "C100532",
        "makh": "TG-KS00056"
    },
    {
        "makhold": "C100533",
        "makh": "TG-KS00057"
    },
    {
        "makhold": "C100531",
        "makh": "TG-KS00058"
    },
    {
        "makhold": "C100734",
        "makh": "TG-KS00059"
    },
    {
        "makhold": "C100768",
        "makh": "TG-KS00060"
    },
    {
        "makhold": "C100476",
        "makh": "TG-KS00061"
    },
    {
        "makhold": "C100825",
        "makh": "TG-KS00062"
    },
    {
        "makhold": "C100001",
        "makh": "TG-KS00063"
    },
    {
        "makhold": "C100438",
        "makh": "TG-KS00064"
    },
    {
        "makhold": "C100817",
        "makh": "TG-KS00065"
    },
    {
        "makhold": "C100742",
        "makh": "TG-KS00066"
    },
    {
        "makhold": "C100715",
        "makh": "TG-KS00067"
    },
    {
        "makhold": "C100842",
        "makh": "TG-KS00068"
    },
    {
        "makhold": "C100784",
        "makh": "TG-KS00069"
    },
    {
        "makhold": "C100426",
        "makh": "TG-KS00070"
    },
    {
        "makhold": "C100054",
        "makh": "TG-KS00071"
    },
    {
        "makhold": "C100617",
        "makh": "TG-KS00072"
    },
    {
        "makhold": "C100614",
        "makh": "TG-KS00073"
    },
    {
        "makhold": "C100601",
        "makh": "TG-KS00074"
    },
    {
        "makhold": "C100741",
        "makh": "TG-KS00075"
    },
    {
        "makhold": "C100860",
        "makh": "TG-KS00076"
    },
    {
        "makhold": "C100824",
        "makh": "TG-KS00077"
    },
    {
        "makhold": "C100827",
        "makh": "TG-KS00078"
    },
    {
        "makhold": "C100459",
        "makh": "TG-KS00079"
    },
    {
        "makhold": "C100623",
        "makh": "TG-KS00080"
    },
    {
        "makhold": "C100547",
        "makh": "TG-KS00081"
    },
    {
        "makhold": "C100622",
        "makh": "TG-KS00082"
    },
    {
        "makhold": "C100624",
        "makh": "TG-KS00083"
    },
    {
        "makhold": "C100625",
        "makh": "TG-KS00084"
    },
    {
        "makhold": "C100760",
        "makh": "TG-KS00085"
    },
    {
        "makhold": "C100644",
        "makh": "TG-KS00086"
    },
    {
        "makhold": "C100650",
        "makh": "TG-KS00087"
    },
    {
        "makhold": "C100639",
        "makh": "TG-KS00088"
    },
    {
        "makhold": "C100794",
        "makh": "TG-KS00089"
    },
    {
        "makhold": "C100187",
        "makh": "TG-KS00090"
    },
    {
        "makhold": "C100233",
        "makh": "TG-KS00091"
    },
    {
        "makhold": "C100247",
        "makh": "TG-KS00092"
    },
    {
        "makhold": "C100200",
        "makh": "TG-KS00093"
    },
    {
        "makhold": "C100199",
        "makh": "TG-KS00094"
    },
    {
        "makhold": "C100201",
        "makh": "TG-KS00095"
    },
    {
        "makhold": "",
        "makh": "TG-KS00096"
    },
    {
        "makhold": "C100806",
        "makh": "TG-KS00097"
    },
    {
        "makhold": "C100585",
        "makh": "TG-KS00098"
    },
    {
        "makhold": "C100446",
        "makh": "TG-KS00099"
    },
    {
        "makhold": "C100448",
        "makh": "TG-KS00100"
    },
    {
        "makhold": "C100443",
        "makh": "TG-KS00101"
    },
    {
        "makhold": "C100555",
        "makh": "TG-KS00103"
    },
    {
        "makhold": "C100222",
        "makh": "TG-KS00104"
    },
    {
        "makhold": "C100034",
        "makh": "TG-KS00105"
    },
    {
        "makhold": "C100223",
        "makh": "TG-KS00106"
    },
    {
        "makhold": "C100033",
        "makh": "TG-KS00107"
    },
    {
        "makhold": "C100707",
        "makh": "TG-KS00108"
    },
    {
        "makhold": "C100697",
        "makh": "TG-KS00109"
    },
    {
        "makhold": "C100538",
        "makh": "TG-KS00110"
    },
    {
        "makhold": "C100101",
        "makh": "TG-KS00111"
    },
    {
        "makhold": "C100224",
        "makh": "TG-KS00112"
    },
    {
        "makhold": "C100272",
        "makh": "TG-KS00113"
    },
    {
        "makhold": "C100294",
        "makh": "TG-KS00114"
    },
    {
        "makhold": "C100829",
        "makh": "TG-KS00115"
    },
    {
        "makhold": "C100702",
        "makh": "TG-KS00116"
    },
    {
        "makhold": "C100792",
        "makh": "TG-KS00117"
    },
    {
        "makhold": "C100773",
        "makh": "TG-KS00118"
    },
    {
        "makhold": "C100775",
        "makh": "TG-KS00119"
    },
    {
        "makhold": "C100757",
        "makh": "TG-KS00120"
    },
    {
        "makhold": "C100774",
        "makh": "TG-KS00121"
    },
    {
        "makhold": "C100780",
        "makh": "TG-KS00122"
    },
    {
        "makhold": "C100703",
        "makh": "TG-KS00123"
    },
    {
        "makhold": "C100699",
        "makh": "TG-KS00124"
    },
    {
        "makhold": "C100833",
        "makh": "TG-KS00125"
    },
    {
        "makhold": "C100698",
        "makh": "TG-KS00126"
    },
    {
        "makhold": "C100789",
        "makh": "TG-KS00127"
    },
    {
        "makhold": "C100028",
        "makh": "TG-KS00128"
    },
    {
        "makhold": "C100751",
        "makh": "TG-KS00129"
    },
    {
        "makhold": "C100549",
        "makh": "TG-KS00130"
    },
    {
        "makhold": "C100838",
        "makh": "TG-KS00131"
    },
    {
        "makhold": "C100837",
        "makh": "TG-KS00132"
    },
    {
        "makhold": "C100859",
        "makh": "TG-KS00133"
    },
    {
        "makhold": "C100479",
        "makh": "TG-KS00134"
    },
    {
        "makhold": "C100480",
        "makh": "TG-KS00135"
    },
    {
        "makhold": "C100802",
        "makh": "TG-KS00136"
    },
    {
        "makhold": "C100840",
        "makh": "TG-KS00137"
    },
    {
        "makhold": "C100803",
        "makh": "TG-KS00138"
    },
    {
        "makhold": "C100843",
        "makh": "TG-KS00139"
    },
    {
        "makhold": "C100173",
        "makh": "TG-KS00140"
    },
    {
        "makhold": "C100580",
        "makh": "TG-KS00141"
    },
    {
        "makhold": "C100640",
        "makh": "TG-KS00142"
    },
    {
        "makhold": "C100227",
        "makh": "TG-KS00144"
    },
    {
        "makhold": "C100733",
        "makh": "TG-KS00145"
    },
    {
        "makhold": "C100734",
        "makh": "TG-KS00146"
    },
    {
        "makhold": "C100735",
        "makh": "TG-KS00148"
    },
    {
        "makhold": "C100800",
        "makh": "TG-KS00149"
    },
    {
        "makhold": "C100732",
        "makh": "TG-KS00150"
    },
    {
        "makhold": "C100736",
        "makh": "TG-KS00151"
    },
    {
        "makhold": "C100263",
        "makh": "TG-KS00153"
    },
    {
        "makhold": "C100265",
        "makh": "TG-KS00154"
    },
    {
        "makhold": "C100274",
        "makh": "TG-KS00155"
    },
    {
        "makhold": "C100785",
        "makh": "TG-KS00156"
    },
    {
        "makhold": "C100658",
        "makh": "TG-KS00157"
    },
    {
        "makhold": "C100659",
        "makh": "TG-KS00158"
    },
    {
        "makhold": "C100834",
        "makh": "TG-KS00159"
    },
    {
        "makhold": "C100830",
        "makh": "TG-KS00160"
    },
    {
        "makhold": "C100660",
        "makh": "TG-KS00161"
    },
    {
        "makhold": "C100661",
        "makh": "TG-KS00162"
    },
    {
        "makhold": "C100607",
        "makh": "TG-KS00163"
    },
    {
        "makhold": "C100609",
        "makh": "TG-KS00164"
    },
    {
        "makhold": "C100662",
        "makh": "TG-KS00165"
    },
    {
        "makhold": "C100663",
        "makh": "TG-KS00166"
    },
    {
        "makhold": "C100664",
        "makh": "TG-KS00167"
    },
    {
        "makhold": "C100665",
        "makh": "TG-KS00168"
    },
    {
        "makhold": "C100666",
        "makh": "TG-KS00169"
    },
    {
        "makhold": "C100667",
        "makh": "TG-KS00170"
    },
    {
        "makhold": "C100717",
        "makh": "TG-KS00171"
    },
    {
        "makhold": "C100852",
        "makh": "TG-KS00172"
    },
    {
        "makhold": "C100853",
        "makh": "TG-KS00173"
    },
    {
        "makhold": "C100718",
        "makh": "TG-KS00174"
    },
    {
        "makhold": "C100805",
        "makh": "TG-KS00175"
    },
    {
        "makhold": "C100399",
        "makh": "TG-KS00177"
    },
    {
        "makhold": "C100400",
        "makh": "TG-KS00178"
    },
    {
        "makhold": "C100290",
        "makh": "TG-KS00179"
    },
    {
        "makhold": "C100297",
        "makh": "TG-KS00180"
    },
    {
        "makhold": "C100719",
        "makh": "TG-KS00181"
    },
    {
        "makhold": "C100730",
        "makh": "TG-KS00182"
    },
    {
        "makhold": "C100705",
        "makh": "TG-KS00183"
    },
    {
        "makhold": "C100435",
        "makh": "TG-KS00184"
    },
    {
        "makhold": "C100318",
        "makh": "TG-KS00185"
    },
    {
        "makhold": "C100098",
        "makh": "TG-KS00186"
    },
    {
        "makhold": "C100826",
        "makh": "TG-KS00187"
    },
    {
        "makhold": "C100255",
        "makh": "TG-KS00188"
    },
    {
        "makhold": "C100058",
        "makh": "TG-KS00189"
    },
    {
        "makhold": "C100061",
        "makh": "TG-KS00190"
    },
    {
        "makhold": "C100226",
        "makh": "TG-KS00191"
    },
    {
        "makhold": "C100254",
        "makh": "TG-KS00192"
    },
    {
        "makhold": "C100704",
        "makh": "TG-KS00193"
    },
    {
        "makhold": "C100706",
        "makh": "TG-KS00194"
    },
    {
        "makhold": "C100750",
        "makh": "TG-KS00196"
    },
    {
        "makhold": "C100822",
        "makh": "TG-KS00197"
    },
    {
        "makhold": "C100090",
        "makh": "TG-KS00198"
    },
    {
        "makhold": "C100820",
        "makh": "TG-KS00199"
    },
    {
        "makhold": "C100819",
        "makh": "TG-KS00200"
    },
    {
        "makhold": "C100815",
        "makh": "TG-KS00202"
    },
    {
        "makhold": "C100816",
        "makh": "TG-KS00203"
    },
    {
        "makhold": "C100530",
        "makh": "TG-KS00204"
    },
    {
        "makhold": "C100494",
        "makh": "TG-KS00205"
    },
    {
        "makhold": "C100647",
        "makh": "TG-KS00206"
    },
    {
        "makhold": "C100449",
        "makh": "TG-KS00207"
    },
    {
        "makhold": "C100691",
        "makh": "TG-KS00209"
    },
    {
        "makhold": "C100683",
        "makh": "TG-KS00210"
    },
    {
        "makhold": "C100743",
        "makh": "TG-KS00211"
    },
    {
        "makhold": "C100503",
        "makh": "TG-KS00212"
    },
    {
        "makhold": "C100765",
        "makh": "TG-KS00213"
    },
    {
        "makhold": "C100529",
        "makh": "TG-KS00214"
    },
    {
        "makhold": "C100501",
        "makh": "TG-KS00216"
    },
    {
        "makhold": "C100745",
        "makh": "TG-KS00217"
    },
    {
        "makhold": "C100687",
        "makh": "TG-KS00218"
    },
    {
        "makhold": "C100748",
        "makh": "TG-KS00219"
    },
    {
        "makhold": "C100605",
        "makh": "TG-KS00220"
    },
    {
        "makhold": "C100610",
        "makh": "TG-KS00221"
    },
    {
        "makhold": "C100478",
        "makh": "TG-KS00222"
    },
    {
        "makhold": "C100508",
        "makh": "TG-KS00223"
    },
    {
        "makhold": "C100504",
        "makh": "TG-KS00224"
    },
    {
        "makhold": "C100425",
        "makh": "TG-KS00225"
    },
    {
        "makhold": "C100467",
        "makh": "TG-KS00226"
    },
    {
        "makhold": "C100420",
        "makh": "TG-KS00227"
    },
    {
        "makhold": "C100427",
        "makh": "TG-KS00228"
    },
    {
        "makhold": "C100366",
        "makh": "TG-KS00229"
    },
    {
        "makhold": "C100680",
        "makh": "TG-KS00230"
    },
    {
        "makhold": "C100848",
        "makh": "TG-KS00231"
    },
    {
        "makhold": "C100782",
        "makh": "TG-KS00232"
    },
    {
        "makhold": "C100849",
        "makh": "TG-KS00233"
    },
    {
        "makhold": "C100720",
        "makh": "TG-KS00234"
    },
    {
        "makhold": "C100390",
        "makh": "TG-KS00235"
    },
    {
        "makhold": "C100388",
        "makh": "TG-KS00236"
    },
    {
        "makhold": "C100777",
        "makh": "TG-KS00237"
    },
    {
        "makhold": "C100631",
        "makh": "TG-KS00238"
    },
    {
        "makhold": "C100527",
        "makh": "TG-KS00239"
    },
    {
        "makhold": "C100575",
        "makh": "TG-KS00240"
    },
    {
        "makhold": "C100083",
        "makh": "TG-KS00241"
    },
    {
        "makhold": "C100408",
        "makh": "TG-KS00242"
    },
    {
        "makhold": "C100213",
        "makh": "TG-KS00243"
    },
    {
        "makhold": "C100453",
        "makh": "TG-KS00244"
    },
    {
        "makhold": "C100466",
        "makh": "TG-KS00245"
    },
    {
        "makhold": "C100493",
        "makh": "TG-KS00246"
    },
    {
        "makhold": "C100005",
        "makh": "TG-KS00247"
    },
    {
        "makhold": "C100006",
        "makh": "TG-KS00249"
    },
    {
        "makhold": "C100053",
        "makh": "TG-KS00250"
    },
    {
        "makhold": "C100744",
        "makh": "TG-KS00251"
    },
    {
        "makhold": "C100445",
        "makh": "TG-KS00252"
    },
    {
        "makhold": "C100437",
        "makh": "TG-KS00253"
    },
    {
        "makhold": "C100411",
        "makh": "TG-KS00254"
    },
    {
        "makhold": "C100754",
        "makh": "TG-KS00255"
    },
    {
        "makhold": "C100797",
        "makh": "TG-KS00256"
    },
    {
        "makhold": "C100851",
        "makh": "TG-KS00257"
    },
    {
        "makhold": "C100740",
        "makh": "TG-KS00258"
    },
    {
        "makhold": "C100811",
        "makh": "TG-KS00259"
    },
    {
        "makhold": "C100812",
        "makh": "TG-KS00260"
    },
    {
        "makhold": "C100813",
        "makh": "TG-KS00261"
    },
    {
        "makhold": "C100814",
        "makh": "TG-KS00262"
    },
    {
        "makhold": "C100810",
        "makh": "TG-KS00263"
    },
    {
        "makhold": "C100695",
        "makh": "TG-KS00265"
    },
    {
        "makhold": "C100653",
        "makh": "TG-KS00266"
    },
    {
        "makhold": "C100373",
        "makh": "TG-KS00268"
    },
    {
        "makhold": "C100368",
        "makh": "TG-KS00269"
    },
    {
        "makhold": "C100374",
        "makh": "TG-KS00270"
    },
    {
        "makhold": "C100292",
        "makh": "TG-KS00271"
    },
    {
        "makhold": "C100577",
        "makh": "TG-KS00272"
    },
    {
        "makhold": "C100798",
        "makh": "TG-KS00273"
    },
    {
        "makhold": "C100839",
        "makh": "TG-KS00274"
    },
    {
        "makhold": "C100844",
        "makh": "TG-KS00275"
    },
    {
        "makhold": "C100783",
        "makh": "TG-KS00276"
    },
    {
        "makhold": "C100801",
        "makh": "TG-KS00277"
    },
    {
        "makhold": "C100248",
        "makh": "TG-KS00278"
    },
    {
        "makhold": "C100772",
        "makh": "TG-KS00279"
    },
    {
        "makhold": "C100846",
        "makh": "TG-KS00280"
    },
    {
        "makhold": "C100856",
        "makh": "TG-KS00281"
    },
    {
        "makhold": "C100858",
        "makh": "TG-KS00282"
    },
    {
        "makhold": "C100312",
        "makh": "TG-KS00283"
    },
    {
        "makhold": "C100759",
        "makh": "TG-KS00284"
    },
    {
        "makhold": "C100317",
        "makh": "TG-KS00285"
    },
    {
        "makhold": "C100791",
        "makh": "TG-KS00286"
    },
    {
        "makhold": "C100790",
        "makh": "TG-KS00287"
    },
    {
        "makhold": "C100786",
        "makh": "TG-KS00288"
    },
    {
        "makhold": "C100700",
        "makh": "TG-KS00289"
    },
    {
        "makhold": "C100701",
        "makh": "TG-KS00290"
    },
    {
        "makhold": "C100620",
        "makh": "TG-KS00291"
    },
    {
        "makhold": "C100619",
        "makh": "TG-KS00292"
    },
    {
        "makhold": "C100031",
        "makh": "TG-KS00293"
    },
    {
        "makhold": "C100032",
        "makh": "TG-KS00294"
    },
    {
        "makhold": "C100168",
        "makh": "TG-KS00295"
    },
    {
        "makhold": "C100091",
        "makh": "TG-KS00296"
    },
    {
        "makhold": "C100857",
        "makh": "TG-KS00297"
    },
    {
        "makhold": "C100092",
        "makh": "TG-KS00298"
    },
    {
        "makhold": "C100796",
        "makh": "TG-KS00299"
    },
    {
        "makhold": "C100093",
        "makh": "TG-KS00300"
    },
    {
        "makhold": "C100150",
        "makh": "TG-KS00301"
    },
    {
        "makhold": "C100618",
        "makh": "TG-KS00302"
    },
    {
        "makhold": "C100821",
        "makh": "TG-KS00303"
    },
    {
        "makhold": "C100828",
        "makh": "TG-KS00304"
    },
    {
        "makhold": "C100490",
        "makh": "TG-KS00305"
    },
    {
        "makhold": "C100492",
        "makh": "TG-KS00306"
    },
    {
        "makhold": "C100491",
        "makh": "TG-KS00307"
    },
    {
        "makhold": "C100217",
        "makh": "TG-KS00308"
    },
    {
        "makhold": "C100731",
        "makh": "TG-KS00309"
    },
    {
        "makhold": "C100738",
        "makh": "TG-KS00310"
    },
    {
        "makhold": "C100804",
        "makh": "TG-KS00312"
    },
    {
        "makhold": "C100809",
        "makh": "TG-KS00313"
    },
    {
        "makhold": "C100854",
        "makh": "TG-KS00314"
    },
    {
        "makhold": "C100855",
        "makh": "TG-KS00315"
    },
    {
        "makhold": "C100865",
        "makh": "TG-KS00316"
    },
    {
        "makhold": "C100863",
        "makh": "TG-KS00317"
    },
    {
        "makhold": "C100211",
        "makh": "TG-KS00318"
    },
    {
        "makhold": "C100048",
        "makh": "TG-KS00319"
    },
    {
        "makhold": "C100022",
        "makh": "TG-KS00320"
    },
    {
        "makhold": "C100872",
        "makh": "TG-KS00321"
    },
    {
        "makhold": "C100186",
        "makh": "TG-KS00322"
    },
    {
        "makhold": "C100259",
        "makh": "TG-KS00323"
    },
    {
        "makhold": "C100753",
        "makh": "TG-KS00324"
    },
    {
        "makhold": "C100681",
        "makh": "TG-KS00325"
    },
    {
        "makhold": "C100751",
        "makh": "TG-KS00326"
    },
    {
        "makhold": "C100105",
        "makh": "TG-KS00327"
    },
    {
        "makhold": "C100636",
        "makh": "TG-KS00328"
    },
    {
        "makhold": "C100686",
        "makh": "TG-KS00329"
    },
    {
        "makhold": "C100582",
        "makh": "TG-KS00330"
    },
    {
        "makhold": "C100771",
        "makh": "TG-KS00331"
    },
    {
        "makhold": "C100808",
        "makh": "TG-KS00332"
    },
    {
        "makhold": "C100447",
        "makh": "TG-KS00333"
    },
    {
        "makhold": "C100316",
        "makh": "TG-KS00334"
    },
    {
        "makhold": "C100770",
        "makh": "TG-KS00335"
    },
    {
        "makhold": "C100713",
        "makh": "TG-KS00339"
    },
    {
        "makhold": "C100724",
        "makh": "TG-KS00340"
    },
    {
        "makhold": "C100293",
        "makh": "TG-KS00342"
    },
    {
        "makhold": "C100412",
        "makh": "TG-KS00343"
    },
    {
        "makhold": "C100499",
        "makh": "TG-KS00347"
    },
    {
        "makhold": "C100873",
        "makh": "TG-KS00348"
    },
    {
        "makhold": "C100301",
        "makh": "TG-KS00349"
    },
    {
        "makhold": "C100302",
        "makh": "TG-KS00350"
    },
    {
        "makhold": "C100304",
        "makh": "TG-KS00351"
    },
    {
        "makhold": "C100878",
        "makh": "TG-KS00352"
    },
    {
        "makhold": "C100880",
        "makh": "TG-KS00353"
    },
    {
        "makhold": "C100851",
        "makh": "TG-KS00354"
    },
    {
        "makhold": "C100886",
        "makh": "TG-KS00355"
    }
];
async function main() {
    for (const item of dulieus) {
        await prisma.khachhang.updateMany({
            where: { makh: item.makh },
            data: { makhold: item.makhold },
        });
    }
}
main()
    .catch((e) => {
    console.error('❌ Lỗi khi seed dữ liệu:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=themmacu.js.map