//关闭弹框
$(document).on('click', '.js-closewin-btn', function () {
    $.colorbox && $.colorbox.close();
});
function checkType(str, type, obj, form) {
    switch (type) {
        case 'required':
            /*必填*/
            return (str != '');
        case 'mail':
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
        case 'phone':
            /*手机号验证,支持台湾*/
            return /^((?!1{11})1\d{10}|09\d{8})$/.test(str);
        case 'mail_phone':
            return /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*|(?!1{11})1\d{10}|09\d{8})$/.test(str);
        case 'code':
            return (function () {
                var num = obj.attr('cuslength') || 1;
                var str_ = '^[0-9]{' + num + '}$';
                var reg = new RegExp(str_);
                return reg.test(str);
            })();
        case 'code_en':
            return (function () {
                var num = obj.attr('cuslength') || 1;
                var str_ = '^[0-9a-zA-Z]{' + num + '}$';
                var reg = new RegExp(str_);
                return reg.test(str);
            })();
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'ch_and_en':
            /*姓名验证*/
            return /^[a-zA-Z\u4E00-\u9FA5]{1,25}$/.test(str);
        case 'nickname':
            return (function () {
                var num = obj.attr('cuslength') || '4,12';
                var str_ = '^[[0-9a-zA-Z_\u4E00-\u9FA5]{' + num + '}$';
                var reg = new RegExp(str_);
                return reg.test(str);
            })();
        //return /^[0-9a-zA-Z_\u4E00-\u9FA5]{4,12}$/.test(str);
        case 'qq':
            /*QQ*/
            return /^[0-9]{5,11}$/.test(str);
        case 'pwd':
            return /^[0-9a-zA-Z_]{6,18}$/.test(str);
        case 'equalTo':
            return (function () {
                var tar = obj.attr('equalTo');
                return (str === $.trim(form.find('#' + tar).val()));
            })();
        case 'specialchars':
            return !/[\-\_\,\!\|\~\`\(\)\#\$\%\^\&\*\{\}\:\;\"\<\>\?]/g.test(str);
        default:
            return true;
    }
}
function validateForm(form_id, opt) {
    var form_ = $('#' + form_id);
    if (!form_.length) {
        return false;
    }
    var fnObj = $.extend(true, {
        checkform: function (obj, val, type) {
            $msg = obj.closest('.input-group').find('.error-msg');
            obj.off('blur.cusrule').on('blur.cusrule', function () {
                fnObj.errtips($(this), $.trim(this.value), $(this).attr('cusrule'));
            }).off('focus.cusrule').on('focus.cusrule', function () {
                $(this).closest('.input-group').find('.error-msg').hide();
            });
            $msg.off('click.cusrule').on('click.cusrule', function () {
                if ($(this).is(':visible')) {
                    obj.focus(); /*重新获取焦点*/
                }
            });
            return this.errtips(obj, val, type);
        },
        form: function () {
            var param = true;
            form_.find('input[cusrule]').each(function (i, n) {
                var obj = $(n);
                var cur = fnObj.checkform(obj, $.trim(this.value), obj.attr('cusrule'));
                param = (param && cur);
            });
            return param;
        },
        errtips: function (obj, val, type) {
            var res = checkType(val, type, obj, form_);
            if (!res) {
                obj.closest('.input-group').addClass('error').find('.error-msg').show();
            } else {
                obj.closest('.input-group').removeClass('error');
            }
            return res;
        }
    }, opt);

    return fnObj;
}

$('.input-group input[data-cat_type]').focus(function () {
    //切换logo 
    var cat_type = $(this).data('cat_type'),
        $img_obj = $(this).closest('.md-body').find('.cus-win-model-tit .img-bg');
    switch (cat_type) {
        case 2://输入手机号
            $img_obj.attr('class', 'img-bg type-cat2');
            break;
        case 3://输入验证码
            $img_obj.attr('class', 'img-bg type-cat3');
            break;
        case 6://输入密码
            $img_obj.attr('class', 'img-bg type-cat6');
            break;
        default:
            $img_obj.attr('class', 'img-bg');
    }
}).blur(function(){
   $(this).closest('.md-body').find('.cus-win-model-tit .img-bg').attr('class','img-bg');
});
// 顶部下拉菜单
$("#js_dropdown_tit").on('click','.dropdown-tit',function(){
    var $list=$("#js_dropdown_tit").find(".dropdown-list");
    if($list.is(":visible")){
        $list.hide();
    }else{
        $list.show();
    }
});