/**
 * Created by 吴思民 on 2019/12/18.
 */
/**
 * Created by 吴思民 on 2019/12/16.
 */
window.onload = function() {
    const banner_img = document.getElementsByClassName("banner_img");
    const banner_bg = document.getElementsByClassName("banner_bg")[0];
    const _play = document.getElementsByClassName("play")[0];
    const video = document.getElementsByClassName("video")[0];
    const mask = document.getElementsByClassName("mask")[0];
    const more_video = document.getElementsByClassName("more_video");
    const his_father = document.getElementsByClassName("his_father")[0];
    const mes_father = document.getElementsByClassName("message_container_last")[0];
    const j10_main_left = document.getElementsByClassName("j10_main_left")[0];
    const j10_main_right = document.getElementsByClassName("j10_main_right")[0];

    let data_history = {};
    let data_message = {};

    //banner动画
    for(let i=0; i<banner_img.length; i++){
        banner_img[i].style.transition = "2s";
        banner_img[i].style.opacity = "0";
        banner_img[i].style.height = "0";
        banner_img[i].style.transform = "rotate(360deg)"
    }
    window.setTimeout(function(){
        banner_bg.style.opacity="1";
    },2000);

    //视频按钮的点击
    mask.onclick = function() {
        if (video.paused) {
            _play.style.display = "none";
            video.play();
        }else{
            video.pause();
            _play.style.display = "block";
        }
    };

    //封装一个Ajax对象
    let Ajax = {
        get: function(url,fn){
            // XMLHttpRequest对象用于在后台与服务器交换数据
            let xhr=new XMLHttpRequest();
            xhr.open('GET',url,false);
            xhr.onreadystatechange=function(){
                // readyState == 4说明请求已完成
                if(xhr.readyState==4){
                    if(xhr.status==200 || xhr.status==304){
                        console.log(xhr.responseText);
                        fn.call(xhr.responseText);
                    }
                }
            };
            xhr.send();
        }
    };

    //调用ajax的get方法（数据要转换！！）
    Ajax.get("./data.json",function(){
        let that = eval('(' + this + ')');
        data_history = that.history;
        data_message = that.message;
    });

    //调用数据，渲染DOM元素到页面中，使用了es6的模板字符串``
    let his_child_child = "";
    for(let i=0; i<data_history.length; i++){
        let child = `<li class="his_son"><img class="more_video" src="${data_history[i].img}" data-video="${data_history[i].data_video}" alt="">
        <p>${data_history[i].title}<br>${data_history[i].push_time}</p></li>`;
        his_child_child = child+his_child_child;
        his_father.innerHTML = his_child_child;
    }

    let mes_child_child = "";
    let mes_count =` <div class="message_container_last_login">
        <div class="last_login_left">
        <svg t="1576577908861" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10011" width="50" height="50"><path d="M926.272 487.424l-45.056 0c-13.632 22.656-54.976 88.704-57.856 94.08-3.136 5.632-10.368 5.76-13.504 0-4.032-7.488-44.48-72.384-57.728-94.08L387.712 487.424c-27.52 0-49.728-22.08-49.728-49.216L337.984 84.096c0-27.136 22.272-49.216 49.728-49.216l538.56 0c27.584 0 49.856 22.08 49.856 49.216l0 354.112C976.128 465.344 953.792 487.424 926.272 487.424L926.272 487.424zM946.176 84.032c0-10.816-8.96-19.648-19.968-19.648L387.712 64.384c-10.88 0-19.904 8.832-19.904 19.648l0 354.176c0 10.88 9.024 19.648 19.904 19.648l538.56 0c11.008 0 19.968-8.768 19.968-19.648L946.24 84.032 946.176 84.032zM482.944 296l362.624 0 0 43.52L482.944 339.52 482.944 296 482.944 296zM482.944 165.44l362.624 0 0 43.52L482.944 208.96 482.944 165.44 482.944 165.44zM91.328 223.424l0 522.176c0 16 12.992 28.992 29.056 28.992l638.208 0c16 0 28.928-12.992 28.928-28.992l0-101.504 43.584 0 0 101.504c0 40.128-32.512 72.512-72.512 72.512l-65.6 0c-19.776 33.344-79.808 130.752-84.096 138.752-4.416 8.256-15.104 8.384-19.584 0-5.824-10.88-64.768-106.752-84.032-138.752L120.384 818.112c-40.064 0-72.576-32.384-72.576-72.512L47.808 223.424c0-40.064 32.512-72.512 72.576-72.512L250.88 150.912l0 43.52L120.384 194.432C104.32 194.432 91.328 207.36 91.328 223.424L91.328 223.424z" p-id="10012" fill="#CABCBC"></path></svg>
        <p>评论需要登录，您还没有登录</p>
    </div>
    <div class="last_login_right">
        <div class="register">注册</div>
        <div class="login">登录</div>
        </div>
        <div class="hr"></div>
        </div>`
    for(let i=0; i<data_history.length; i++){
        let child = `<div class="message_user"><div class="message_user_info">
                                <img src="${data_message[i].img}" alt="">
                                <div class="message_user_info_right">
                                    <p>${data_message[i].user_name}</p>
                                    <p>${data_message[i].user_address} ${data_message[i].user_push_time}</p>
                                </div>
                                <div class="message_user_info_text">
                                    ${data_message[i].user_push_text}
                                </div>
                                <div class="message_user_info_comment">
                                    <svg t="1576580944592" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11663" width="200" height="200"><path d="M307.2 204.8h409.6a136.533333 136.533333 0 0 1 136.533333 136.533333v288.085334a108.612267 108.612267 0 0 1-108.612266 108.612266h-90.2144a34.133333 34.133333 0 0 0-28.501334 15.36l-85.504 129.6384a34.133333 34.133333 0 0 1-57.002666 0L397.994667 753.322667a34.133333 34.133333 0 0 0-28.501334-15.325867H279.278933A108.612267 108.612267 0 0 1 170.666667 629.418667V341.333333a136.533333 136.533333 0 0 1 136.533333-136.533333z m204.8 628.4288l71.2704-108.032a85.333333 85.333333 0 0 1 71.236267-38.365867h90.2144c31.709867 0 57.412267-25.7024 57.412266-57.412266V341.333333A85.333333 85.333333 0 0 0 716.8 256H307.2A85.333333 85.333333 0 0 0 221.866667 341.333333v288.085334c0 31.709867 25.7024 57.412267 57.412266 57.412266h90.2144a85.333333 85.333333 0 0 1 71.236267 38.365867L512 833.194667zM294.775467 447.624533a25.6 25.6 0 1 1 0-51.2h434.449066a25.6 25.6 0 0 1 0 51.2H294.775467z m0 155.136a25.6 25.6 0 1 1 0-51.2h310.306133a25.6 25.6 0 1 1 0 51.2h-310.272z" fill="#B4A0A0" p-id="11664"></path></svg>
                                    <p>回复</p>
                                </div>
                                <div class="hr"></div>
                            </div>
                            <div class="message_user_count">
                                <div class="small"></div>
                                <p>${data_message[i].good}</p>
                            </div></div>`;
        mes_child_child =child+mes_child_child;
        mes_father.innerHTML =mes_count +  mes_child_child;

    }


    //事件委托，这里的li元素，即往期回顾列表，有一个点击事件，因为是后期渲染的，事件没有添加进去，所以要委托给其父元素
    let aList = document.getElementsByClassName("his_father")[0];
    aList.onclick = function (event){
        let ev = event||window.event;
        let target = ev.target || ev.srcElement;
        /*var target=event.target;*/
        if (target.nodeName.toLocaleLowerCase()==="img" || target.nodeName.toLocaleLowerCase()==="p"){
            more_video.onclick = function() {
                for(let i=0; i<more_video.length; i++){
                    let data_video = this.getAttribute('data-video');
                    video.src= "./images/"+data_video+".mp4";
                    _play.style.display = "none";
                    video.play();
                }
            };

            for(let i=0; i<more_video.length; i++){
                more_video[i].onclick = function() {
                    video.src= "./images/"+ this.getAttribute('data-video') +".mp4";
                    _play.style.display = "none";
                    video.play();
                }
            }
        }
    };

    //监听页面body的滚动情况
    let main_right = document.getElementsByClassName("j10_main_right")[0];
    let main_right_div = document.getElementsByClassName("j100")[0];
    window.onscroll = function() {
        let scroll_top = document.documentElement.scrollTop;
        if(scroll_top >= 1036 || document.body.scrollTop >=1036){
            main_right.style.position = "fixed";
            main_right.style.transition = "1s";
            main_right.style.top = "-34px";
            main_right_div.style.height = "670px";
        }else {
            main_right.style.transition = "1s";
            main_right.style.position = "relative";
            main_right_div.style.height = "922px";
        }
    };

    //页面做好以后 修改页面适配的bug
    window.onresize = function() {
         j10_main_left.style.width = window.innerWidth*0.67 + "px";
         console.log(window.innerWidth*0.67);
        if(window.innerWidth <= 768){
            j10_main_left.style.width = window.innerWidth + "px";
        }
        if(window.innerWidth >= 1604){
            j10_main_left.style.width = 1064 + "px";
        }
        if(window.innerWidth >= 1938){
            j10_main_right.style.width = 356 + "px";
        }


    }



};