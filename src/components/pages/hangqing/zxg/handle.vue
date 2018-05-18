/*
 * @Author:litt
 * @Date: 2017-10-27
 * @Description: 资讯---点赞/转发等
*/


<template>
    <div class="from_handle clearfix">
    <div class="f_left from">
        
    </div>
    <div class="f_right handle">
        <span>赞</span>
        <span class="send">转发</span>
        <span>收藏</span>
    </div>
    </div>
</template>

<script>
export default {
  props: ['handleData']
}
</script>

<style lang="less">
    .f_left{
        float: left;
    }
    .f_right{
        float: right;
    }
    .blue{
        color: #06c;
    }
    .from_handle{
        padding: 5px 0 0;
    }
    .from{
        color: #999;
    }
    .origin{
        margin-right: 50px;
    }
    .send{
        display: inline-block;
        padding: 0 5px;
        margin: 0 5px;
        border-left: 1px solid #06c;
        border-right: 1px solid #06c;
        line-height: 1em;
    }
    .handle{
        span{
            cursor: pointer;
            color: #06c;
        }
    }
</style>
