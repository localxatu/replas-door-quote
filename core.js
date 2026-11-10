(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DoorCalc=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const money=n=>Math.round(Number(n)||0);
  const validMoney=v=>(typeof v==='number'||typeof v==='string')&&String(v).trim()!==''&&Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=1e12;
  function limitsOK(l,w,h){return !l||(!l.max_width_mm||w<=l.max_width_mm)&&(!l.max_height_mm||h<=l.max_height_mm)&&(!l.min_width_mm||w>=l.min_width_mm)&&(!l.min_height_mm||h>=l.min_height_mm)&&(!l.width_under_mm||w<l.width_under_mm);}
  function calculate(c,data){
    const p=data.pricing,mat=p.materials[c.material];
    if(!mat)throw Error('Loại cửa không hợp lệ');
    const rows=[],warnings=[],unknown=[];const w=Number(c.width),h=Number(c.height),q=Number(c.quantity);
    const add=(label,min,max=min,source=null,kind='door')=>rows.push({label,min:money(min),max:money(max),source,kind});
    const fail=s=>unknown.push(s);
    for(const [key,label] of [['baseOverride','Giá cửa nhập tay'],['installOverride','Giá công nhập tay'],['customAmount','Phụ kiện khác'],['slidingPrice','Giá phụ kiện lùa']]){
      if(c[key]!==''&&c[key]!==undefined&&c[key]!==null&&!validMoney(c[key]))fail(label+': nhập số tiền không âm và hợp lệ.');
    }
    if(c.installVat!==''&&c.installVat!==undefined&&c.installVat!==null&&(!validMoney(c.installVat)||Number(c.installVat)>100))fail('VAT lắp đặt phải từ 0% đến 100%.');
    const variants=mat.base_variants;
    let type=c.type,baseId=type==='arch'?'single':type;
    if(c.material==='composite'&&type==='double')baseId=w<=1710?'double_small':'double_large';
    if(c.material==='composite'&&type==='leaf')baseId=w<=715?'leaf_small':w<=825?'leaf_medium':'leaf_large';
    const base=variants.find(v=>v.id===baseId);
    const getAddon=id=>mat.addons.find(a=>a.id===id);
    let invalidSize=!(Number.isInteger(w)&&Number.isInteger(h)&&w>0&&h>0);
    if(!(Number.isInteger(q)&&q>=1&&q<=999))fail('Số lượng phải là số nguyên từ 1 đến 999.');
    let lim=base&&base.limits;
    if(base&&!lim){
      const standard=variants.find(v=>v.id==='single');
      if(standard)lim=standard.limits;
      warnings.push('Bảng chưa ghi quy cách riêng cho cấu hình này; cần xác nhận kích thước trước khi chốt.');
    }
    if(lim){if(lim.all)lim=lim.all;else if(lim[c.surface||'patterned'])lim=lim[c.surface||'patterned'];}
    let oversized=false;
    if(c.material==='composite'&&type==='single'&&h>2230&&h<=2530&&w<=1010&&['90','110'].includes(String(c.frame))){oversized=true;lim={max_width_mm:1010,max_height_mm:2530};}
    if(!limitsOK(lim,w,h))invalidSize=true;
    if(c.material==='carbon'&&['single','sliding'].includes(type)&&['CB11','CB22'].includes(c.carbonCode)&&(w<825||h<1850))invalidSize=true;
    if(base&&base.limits&&base.limits.boundary_raw&&(w===base.limits.max_width_mm||h===base.limits.max_height_mm))warnings.push('Kích thước sát ngưỡng “dưới” trong bảng giá; xác nhận lại trước khi chốt.');
    if(invalidSize)warnings.push('Kích thước ngoài quy cách đã có giá hoặc không hợp lệ. Cần nhập giá đã xác nhận.');
    const manualBase=validMoney(c.baseOverride);
    if(manualBase){add('Cửa / cánh (giá nhập tay, đã gồm VAT)',c.baseOverride,c.baseOverride,null);warnings.push('Giá cửa được nhập tay thay cho giá cơ bản trong bảng.');}
    else if(!base||invalidSize||c.modelUnpriced){fail(!base?'Chưa có đơn giá bộ cửa cho cấu hình này.':c.modelUnpriced?'Mẫu này chưa có giá cơ bản được xác nhận.':'Cần xác nhận giá cho kích thước ngoài quy cách.');}
    else add(type==='leaf'?'Cánh cửa':'Cửa và khung',base.price,base.price,base.source);
    if(oversized&&!manualBase)add('Phụ thu chiều cao 2231–2530 mm',285000,285000,getAddon('oversize_height').source);
    if(type==='arch'&&c.material==='composite')add('Phụ thu cửa vòm',950000,950000,getAddon('arch').source);
    if(c.material==='carbon'&&!c.carbonCode&&['single','sliding','leaf'].includes(type)){
      warnings.push('Ảnh Carbon chưa có bảng quy đổi sang mã CB; đang giữ tên ảnh và giá nhóm.');
      if(w<825||h<1850)fail('Cần xác nhận mã Carbon để kiểm tra kích thước tối thiểu CB11/CB22.');
    }
    if(c.frame&& !['90','110','base'].includes(String(c.frame))&&type!=='leaf'){
      const a=getAddon('frame'+c.frame);
      if(a&&limitsOK(a.limits,w,h))add(a.label,a.price,a.price,a.source);
      else fail('Phụ thu khung '+c.frame+' mm chưa có giá cho kích thước này.');
    }
    if(c.glass&&c.glass!=='none'){
      const a=getAddon(c.glass==='201'?'glass201':c.glass==='206'?'glass206':'glass202_205');
      if(!['single','arch','leaf'].includes(type))fail('Cấu hình này ghi mẫu không ô kính; cần xác nhận đơn giá ô kính.');
      else if(a)add('Ô kính '+c.glass,a.price,a.price,a.source);
    }
    if(c.slidingPack&&type==='sliding'){
      if(base&&base.sliding_accessory_price)add('Bộ phụ kiện cửa lùa',base.sliding_accessory_price,base.sliding_accessory_price,base.source);
      else if(validMoney(c.slidingPrice))add('Phụ kiện cửa lùa (nhập tay, đã gồm VAT)',c.slidingPrice);
      else fail('Chưa nhập đơn giá phụ kiện cửa lùa.');
    }
    if(type==='sliding'&&!c.slidingPack)warnings.push('Chưa cộng phụ kiện cửa lùa.');
    for(const e of c.extras||[]){
      const a=getAddon(e.id),n=Number(e.quantity);
      if(!a||!Number.isInteger(n)||n<1){fail('Vật tư bổ sung không hợp lệ.');continue;}
      if(['arch','oversize_height'].includes(a.id)||a.id.startsWith('frame')){fail('Mục phụ thu bị trùng với cấu hình chính.');continue;}
      if(['arch_paint','square_paint'].includes(a.id)){fail('Dòng giá sơn chưa rõ cách cộng; cần xác nhận trước.');continue;}
      if(!limitsOK(a.limits,w,h)){fail(a.label+': ngoài kích thước có đơn giá.');continue;}
      add(a.label+' × '+n,a.price*n,a.price*n,a.source);
      if(a.id==='hardware_work'&&c.install!=='none')warnings.push('Đã cộng công gia công phụ kiện riêng: kiểm tra để tránh trùng công lắp đặt.');
    }
    if(c.transom&&c.transom.enabled){
      const t=c.transom,tw=Number(t.width),th=Number(t.height),perimeter=2*(tw+th);
      const row=mat.transom.find(x=>perimeter<x.perimeter_under_mm),fp=row&&row.frame_prices[t.frame];
      if(tw<=0||th<=0||!fp)fail('Ô fix ngoài quy cách hoặc khung chưa có giá.');
      else{add('Ô fix '+tw+' × '+th+' mm',fp,fp,row.source);const fill=row.fill_addons.find(x=>x.id===t.fill);if(fill)add(fill.label,fill.price,fill.price,row.source);}
    }
    const lock=data.locks.find(l=>l.id===c.lockId);
    if(c.lockId&&!lock)fail('Mã khóa không tồn tại.');
    if(lock){const n=Number(c.lockQuantity||1);if(!Number.isInteger(n)||n<1)fail('Số lượng khóa không hợp lệ.');else{add('Khóa '+lock.sku+' × '+n,lock.price*n,lock.price*n,lock.source,'lock');add('VAT khóa 10%',money(lock.price*n*.1),money(lock.price*n*.1),lock.source,'lock-vat');}}
    if(validMoney(c.customAmount)&&Number(c.customAmount)>0)add(c.customLabel||'Phụ kiện khác (đã gồm VAT)',c.customAmount);
    let installation=null;
    if(c.install&&c.install!=='none'){
      installation=p.installation.find(x=>x.id===c.install);
      if(!installation)fail('Loại công lắp đặt chưa có giá.');
      else{const custom=validMoney(c.installOverride);const lo=custom?Number(c.installOverride):installation.min,hi=custom?Number(c.installOverride):installation.max;
        add('Lắp đặt / bộ'+(custom?' (nhập tay)':''),lo,hi,installation.source,'install');
        if(validMoney(c.installVat)&&Number(c.installVat)<=100)add('VAT lắp đặt '+c.installVat+'%',lo*Number(c.installVat)/100,hi*Number(c.installVat)/100,null,'install-vat');
        else warnings.push('Tạm tính chưa gồm VAT lắp đặt: bảng nguồn chưa ghi thuế suất.');
      }
    }
    if(type==='leaf'&&c.install!=='none')warnings.push('Bảng công lắp tính theo bộ cửa; cần xác nhận khi chỉ mua cánh.');
    if(mat.hinges_included!==true&&type!=='leaf')warnings.push(c.material==='carbon'?'Giá Carbon chưa gồm khóa và phụ kiện; kiểm tra bản lề/phụ kiện cần mua.':'Bảng ABS chưa xác nhận bản lề đã bao gồm; kiểm tra trước khi chốt.');
    const quantity=Number.isInteger(q)&&q>=1&&q<=999?q:1;
    return {rows,unknown:[...new Set(unknown)],warnings:[...new Set(warnings)],quantity,min:rows.reduce((s,r)=>s+r.min,0)*quantity,max:rows.reduce((s,r)=>s+r.max,0)*quantity,base:base||null,complete:unknown.length===0,installation,unitMin:rows.reduce((s,r)=>s+r.min,0),unitMax:rows.reduce((s,r)=>s+r.max,0)};
  }
  function order(configs,shipping,data){
    const lines=configs.map(c=>calculate(c,data)),unknown=lines.flatMap(l=>l.unknown),warnings=lines.flatMap(l=>l.warnings);
    let delivery=0;
    const sets=configs.reduce((s,c)=>s+(c.type==='leaf'?0:Number(c.quantity)||0),0);
    if(shipping.mode==='pickup')delivery=0;
    else if(shipping.mode==='free'&&sets>=data.pricing.shipping.free_min_sets)delivery=0;
    else if(shipping.mode==='free')unknown.push('Miễn phí vận chuyển áp dụng từ 1 bộ cửa; đơn chỉ có cánh cần xác nhận.');
    else if(shipping.mode==='custom'&&validMoney(shipping.amount))delivery=money(shipping.amount);
    else unknown.push('Chưa xác nhận phí vận chuyển.');
    return {lines,delivery,sets,min:lines.reduce((s,l)=>s+l.min,0)+delivery,max:lines.reduce((s,l)=>s+l.max,0)+delivery,unknown:[...new Set(unknown)],warnings:[...new Set(warnings)],complete:unknown.length===0};
  }
  return {calculate,order,validMoney,limitsOK};
});
