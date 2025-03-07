import {getLodop} from '@/tools/LodopFuncs'
//  自有产品标签
const PrintAccount = (data, printingQuantity, apiece, repeat) => {
  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }

  //  调用打印对象
  LODOP = getLodop()
  //  序号
  LODOP.PRINT_INITA(0, 0, 50, 50, '成品_自有产品标签');
  LODOP.SET_PRINT_PAGESIZE(1, '95mm', '65mm', '');
  /*  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
    LODOP.SET_PRINT_STYLEA(2, 'AngleOfPageInside', 180);*/
  for (var i = 0; i < printingQuantity; i++) {
    LODOP.SET_PRINT_STYLE('FontSize', 15);
    LODOP.SET_PRINT_STYLEA('FontName','黑体');
    LODOP.ADD_PRINT_TEXT('1.5mm', '16mm', '65mm', '10mm', data[0].goodName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.SET_PRINT_STYLEA(0, 'Bold', 1);// 给前面的那个文本加粗。
    if (getLength(data[0].color) >= 19) {
      LODOP.ADD_PRINT_TEXT('14mm', '16mm', '68mm', '10mm', data[0].color);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
      LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    } else {
      LODOP.ADD_PRINT_TEXT('14mm', '16mm', '75mm', '10mm', data[0].color);
      LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 1);
    }
    LODOP.SET_PRINT_STYLEA(0, 'QRCodeVersion', 7);
    LODOP.ADD_PRINT_BARCODE('10mm', '81mm', '13mm', '13mm', 'QRCode', data[0].barcode)
    LODOP.ADD_PRINT_TEXT('22mm', '16mm', '33mm', '10mm', data[0].executiveStandard);
    console.log(getLength(data[0].executiveStandard))
    if(getLength(data[0].executiveStandard)>14){
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 6);
    }else{
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
    }
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    LODOP.SET_PRINT_STYLEA(0, 'LetterSpacing', 0.1);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('26.5mm', '16mm', '33mm', '10mm', data[0].standardForSubstances);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 9);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('24mm', '64mm', '33mm', '10mm', data[0].mixtureRatio);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11.5);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('33mm', '16mm', '32mm', '10mm', data[0].productionDate);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('33mm', '64mm', '32mm', '10mm', data[0].lotNo);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('43mm', '16mm', '31mm', '10mm', data[0].qualityGuaranteePeriod);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.ADD_PRINT_TEXT('41mm', '64mm', '33mm', '10mm', data[0].spec);
    LODOP.SET_PRINT_STYLEA(0, 'FontSize', 26);
    LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
    LODOP.SET_PRINT_STYLEA(0,'LineSpacing', 1);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.SET_PRINT_STYLE('FontSize', 10.5);
    LODOP.ADD_PRINT_TEXT('55mm', '15.5mm', '50mm', '10mm', '料号:' + data[0].goodCode);
    LODOP.SET_PRINT_STYLEA(0,'Bold',1);// 给前面的那个文本加粗。
    LODOP.SET_PRINT_STYLEA(0, 'TextNeatRow', true);
    // 分页
    LODOP.NewPage();
  }
}
//  打印A4
const PrintSemi = (data, projectName) => {
  function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) != null) {
        // 全角
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  }

  function fucCheckLength(strTemp) {
    var i, sum;
    sum = 0;
    for (i = 0; i < strTemp.length; i++) {
      if ((strTemp.charCodeAt(i) >= 0) && (strTemp.charCodeAt(i) <= 255)) {
        sum = sum + 1;
      } else {
        sum = sum + 2;
      }
    }
    return sum;
  }

  function cutStr(str, L, M) {
    var result = ''
    var strlen = str.length //  字符串长度
    var chrlen = str.replace(/[^x00-\xff]/g, '**').length //  字节长度
    if (chrlen <= L) {
      return str
    }

    for (var i = 0, j = 0; i < strlen; i++) {
      var chr = str.charAt(i)
      if (/[x00-\xff]/.test(chr)) {
        j++ //  ascii码为0-255，一个字符就是一个字节的长度
      } else {
        j += 2 //  ascii码为0-255以外，一个字符就是两个字节的长度
      }
      if (j <= L) { //  当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
        result += chr
      } else { //  反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
        return result
      }
    }
  }

  function getLength(val) {
    var str = new String(val);
    var bytesCount = 0;
    for (var i = 0, n = str.length; i < n; i++) {
      var c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCount += 1;
      } else {
        bytesCount += 2;
      }
    }
    return bytesCount;
  }

  let fenyeSize = 0;
  let num = 2
  LODOP.SET_PRINT_PAGESIZE(0, '210mm', '297mm', 'A4');// 一开始用的是像素，后来都改成用mm为单位
  LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1);
  LODOP.SET_PRINT_STYLEA(0, 'AngleOfPageInside', 90);
  // 动态列表信息
  let trheight = 9;// 用于每个竖线距离上面的固定长度
  let thHeight = 11;// 用于每行距离上面的固定长度47.98
  let newHeight = 0;// 用于动态增加一行的长度
  let lastSize = 0;// 分页前的那个下标
  let lastheght = 2;
  let size = 10;
  let extendSize = 0;
  let table_hegth = (size + 1) * 25;
  let fonsize = 4;

  // 标题等
  // 标题等
  LODOP.ADD_PRINT_TEXT('1.5mm', '1mm', '210mm', '10mm', projectName);
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
  LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
  LODOP.ADD_PRINT_TEXT('13.15mm', '1mm', '25mm', '5.37mm', '专家名称');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('13.15mm', '25mm', '15mm', '5.37mm', '性别');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('13.15mm', '40mm', '50mm', '5.37mm', '单位');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('13.15mm', '90mm', '50mm', '5.37mm', '身份证号码');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('13.15mm', '140mm', '40mm', '5.37mm', '手机号码');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  LODOP.ADD_PRINT_TEXT('13.15mm', '180mm', '20mm', '5.37mm', '职称');
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
  // 表格线
  LODOP.ADD_PRINT_LINE('10mm', '1mm', '10mm', '200mm', 0, 1);//  最上条标题横线
  LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '200mm', 0, 1);//  标题下横线
  LODOP.ADD_PRINT_LINE('10mm', '1mm', '19.11mm', '1mm', 0, 1);//  最左竖线
  // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
  LODOP.ADD_PRINT_LINE('10mm', '25mm', '19.11mm', '25mm', 0, 1);
  LODOP.ADD_PRINT_LINE('10mm', '40mm', '19.11mm', '40mm', 0, 1);
  LODOP.ADD_PRINT_LINE('10mm', '90mm', '19.11mm', '90mm', 0, 1);
  LODOP.ADD_PRINT_LINE('10mm', '140mm', '19.11mm', '140mm', 0, 1);
  LODOP.ADD_PRINT_LINE('10mm', '180mm', '19.11mm', '180mm', 0, 1);
  LODOP.ADD_PRINT_LINE('10mm', '200mm', '19.11mm', '200mm', 0, 1);
  for (let k = 0; k < data.length; k++) {
    let allProductNumber = 0;
    let aaa = '1234567890';
    let bbb = '1234567890';
    let ccc = '1234567';
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize +10;
    let SizeTmpt = parseInt(getByteLen(aaa) / 35);
    if (parseInt(getByteLen(bbb) / 16) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(bbb) / 16);
    }
    if (parseInt(getByteLen(ccc) / 17) > SizeTmpt) {
      SizeTmpt = parseInt(getByteLen(ccc) / 17);
    }
    LODOP.SET_PRINT_STYLE('FontSize', 8);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '1mm', '25mm', '9mm', data[k].expertName);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '25mm', '15mm', '12mm', data[k].sex);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '40mm', '50mm', '12mm', data[k].workUnit);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '90mm', '50mm', '12mm', data[k].idcardNo);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '140mm', '40mm', '12mm', data[k].mobilePhone);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    LODOP.ADD_PRINT_TEXT(thHeight + newHeight + 'mm', '180mm', '20mm', '12mm', data[k].job);
    LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
    extendSize += SizeTmpt;
    newHeight = (k - lastSize) * 5.37 + extendSize * fonsize +10;
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '1mm', trheight + newHeight + 5.37 + 'mm', '1mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '25mm', trheight + newHeight + 5.37 + 'mm', '25mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '40mm', trheight + newHeight + 5.37 + 'mm', '40mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '90mm', trheight + newHeight + 5.37 + 'mm', '90mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '140mm', trheight + newHeight + 5.37 + 'mm', '140mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '180mm', trheight + newHeight + 5.37 + 'mm', '180mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight - SizeTmpt * fonsize + 'mm', '200mm', trheight + newHeight + 5.37 + 'mm', '200mm', 0, 1);//
    LODOP.ADD_PRINT_LINE(trheight + newHeight + 5.57 + 'mm', '1mm', trheight + newHeight + 5.57 + 'mm', '200mm', 0, 1);// 每条数据后加一横线
    if ((trheight + newHeight + 5.57 + 8 + 7.6) >= 211) {
      LODOP.NewPage();
      thHeight = 11 - 5.37;
      lastSize = k;
      trheight = 9 - 5.37;
      extendSize = 0;
      newHeight = 0;
      LODOP.ADD_PRINT_TEXT('1.5mm', '1mm', '210mm', '10mm', projectName);
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 18);
      LODOP.SET_PRINT_STYLEA(0,'FontName','黑体');
      LODOP.ADD_PRINT_TEXT('13.15mm', '1mm', '25mm', '5.37mm', '专家名称');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('13.15mm', '25mm', '15mm', '5.37mm', '性别');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('13.15mm', '40mm', '50mm', '5.37mm', '单位');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('13.15mm', '90mm', '50mm', '5.37mm', '身份证号码');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('13.15mm', '140mm', '40mm', '5.37mm', '手机号码');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      LODOP.ADD_PRINT_TEXT('13.15mm', '180mm', '20mm', '5.37mm', '职称');
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2);
      // 表格线
      LODOP.ADD_PRINT_LINE('10mm', '1mm', '10mm', '200mm', 0, 1);//  最上条标题横线
      LODOP.ADD_PRINT_LINE('19.31mm', '1mm', '19.31mm', '200mm', 0, 1);//  标题下横线
      LODOP.ADD_PRINT_LINE('10mm', '1mm', '19.11mm', '1mm', 0, 1);//  最左竖线
      // 添加一条线，参数(开始短点距离头部距离，开始端点距左边距离，结束端点距头部距离，结束端点距左边距离)
      LODOP.ADD_PRINT_LINE('10mm', '25mm', '19.11mm', '25mm', 0, 1);
      LODOP.ADD_PRINT_LINE('10mm', '40mm', '19.11mm', '40mm', 0, 1);
      LODOP.ADD_PRINT_LINE('10mm', '90mm', '19.11mm', '90mm', 0, 1);
      LODOP.ADD_PRINT_LINE('10mm', '140mm', '19.11mm', '140mm', 0, 1);
      LODOP.ADD_PRINT_LINE('10mm', '180mm', '19.11mm', '180mm', 0, 1);
      LODOP.ADD_PRINT_LINE('10mm', '200mm', '19.11mm', '200mm', 0, 1);

    }
  }
}
export {
  PrintAccount,
  PrintSemi
}
