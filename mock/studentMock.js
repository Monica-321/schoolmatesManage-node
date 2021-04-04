var Mock = require('mockjs');
var mongoose = require('mongoose');
Mock.Random.extend({
  phone: function () {
    var phonePrefixs = ['132', '135', '189'] // 自己写前缀哈
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
});

// 操作 mongodb 一共有 3 步：
// 1,"创建数据结构
var Schema = mongoose.Schema;
var schoolMateSchema = new Schema({
  id: { type: String, unique: true },//学号[入学年份+3296+【5number】]
  name: { type: String },//姓名[china foreinger]
  gender: { type: Number },//性别,0女1男[number|[0-1]]
  nationality: { type: String },//民族[56｜1]
  birthDate: { type: String },//出生日期[pincou]
  faculty: { type: String },//院系[xinxixueyuan]
  educationStatus: { type: Number },//就读身份？0本科生1研究生[2|1]
  yearOfEnrollment: { type: String },//入学年份["2017","2016","2015","2014","2013"]
  yearOfGraduation: { type: String },//毕业年份["2021","2020","2019","2018","2017","2016"]
  politicalStatus: { type: String },//政治面貌[4|1]
  homeTown: { type: String },//籍贯[city]
  srcPlace: { type: String },//生源地[city]
  dstPlace: { type: String },//去向城市[city]
  major: { type: String },//专业[5|1]
  majorClass: { type: Number },//班级[3|1]
  contactPhone: { type: String },//联系手机号[number]
  contactEmail: { type: String },//联系邮箱[string]
  workArea: { type: String },//现从事行业[7｜1]
  job: { type: String },//就业岗位[20|1]
  companyRank: { type: String },//入职公司(bat，100强，500强,其他)[1|4],
  graduateChoice: { type: String },
  salary: { type: Number },
  companySize: { type: String },
  employWay: { type: String }
});
const nationalityList = ["壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌兹别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族", "汉族"];
const politicalStatusList = ["中共党员", "共青团员", "群众", "其他"];
const jobList = ["培训讲师", "教师", "动画设计师", "建模工程师", "视觉设计师", "游戏策划", "测试工程师", "JAVA开发工程师", "前端开发工程师", "嵌入式工程师", "通信工程师", "算法工程师", "媒体运营", "平面设计师", "数据分析工程师", "原画师", "产品经理", "运维工程师", "后期制作", "自媒体"];
const companyRankList = ["50强", "100强", "500强", "其他"];
const graduateChoiceList = ["考研", "考公", "未就业", "其他", "留学"];
const companySizeList = ["0-20", "20-99", "100-499", "500-999", "1000-9999", "10000及以上"];
var schoolMatesmodel = mongoose.model('SchoolMate', schoolMateSchema);

let data = [];
function getMockData() {
  for(let yearOfEnrollment = 2013; yearOfEnrollment <= 2017; yearOfEnrollment++){
    for (let i = 961; i <= 1000; i++) {
      data.push(
        Mock.mock({
          // "id": yearOfEnrollment.toString()+"3296"+i.toString(),
          "id":`${yearOfEnrollment}3296${20000+i}`,
          "name": "@cname",
          "gender|0-1": 1,
          "nationality|1": nationalityList,
          // "nationality": "汉族",
          "birthDate": (yearOfEnrollment - 22).toString() + '@date("-MM-dd")',
          // "birthDate": (yearOfEnrollment - 18).toString() + '@date("-MM-dd")',
          "faculty": "信息学院",
          "educationStatus": 1,
          // "educationStatus": 0,
          "yearOfEnrollment": yearOfEnrollment,
          "yearOfGraduation": yearOfEnrollment + 3,
          // "yearOfGraduation": yearOfEnrollment + 4,
          "politicalStatus|1": politicalStatusList,
          "homeTown": '@city(true)',
          "srcPlace": '@city(true)',
          "dstPlace": '@city(true)',
          // "major|1": ["dm", "cs", "em", "tx", "ai"],
          "major|1": ["cat", "sih"],
          "majorClass|1-2": 2,
          'contactPhone|1': '@phone',
          "contactEmail": "@email",
          "workArea|1": ["edu", "animation", "game", "newMedia", "internet", "shop", "other"],
          // "workArea": null,
          "job|1": jobList,
          // "job": null,
          "companyRank|1": companyRankList,
          // "companyRank": null,
          // "graduateChoice|1": graduateChoiceList,
          "graduateChoice": "就业",
          "salary|5000-17000": 17000,
          // "salary": null,
          "companySize|1": companySizeList,
          // "companySize": null
        })
      )
    }
  }
}
getMockData();

mongoose.connect('mongodb://localhost:27017/alumni',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  async () => {
    const schoolMates = await schoolMatesmodel.create(data);
    console.log("模拟成功");
  }
);


// 模拟的一个例子JSON：
// {
//   "_id" : ObjectId("606949e5a9a8ab41746e59e2"),
//   "id" : "2013329620001",
//   "name" : "邓刚",
//   "gender" : 0,
//   "nationality" : "汉族",
//   "birthDate" : "1995-06-05",
//   "faculty" : "信息学院",
//   "educationStatus" : 0,
//   "yearOfEnrollment" : "2013",
//   "yearOfGraduation" : "2017",
//   "politicalStatus" : "中共党员",
//   "homeTown" : "澳门特别行政区 澳门半岛",
//   "srcPlace" : "台湾 嘉义市",
//   "dstPlace" : "澳门特别行政区 澳门半岛",
//   "major" : "cs",
//   "majorClass" : 1,
//   "contactPhone" : "13515800611",
//   "contactEmail" : "r.jjopsj@mvfhguls.td",
//   "workArea" : "internet",
//   "job" : "媒体运营",
//   "companyRank" : "100强",
//   "graduateChoice" : "就业",
//   "salary" : 15035,
//   "companySize" : "10000及以上",
//   "__v" : 0
// }
