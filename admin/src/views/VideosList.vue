<template>
 <div class="container">
        <h1>视频列表</h1>
        <el-table :data="videos">
               <!-- 
                      el:
                      :data 相当于for循环
                      prop可以之间使用属性名
                      scope.row表示当前这一行数据(自己本身)但是必须的有slot-scope='scope'
                -->
                <el-table-column  prop="_id" label='ID' width="230"></el-table-column>
                <el-table-column  prop="icon" label='图标'>
                       <!-- 
                              自定义要显示的内容
                               <template slot-scope="scope"></template>
                               scope.row表示这一行数据
                        -->
                         <template slot-scope="scope">
                                <img :src="scope.row.icon" alt="" style='height:3rem'>
                         </template>       
                </el-table-column>
                <el-table-column  prop="name" label='物品名称'></el-table-column>
                <el-table-column
                     fixed="right"
                     label="操作"
                     width="180">
                     <template slot-scope='scope'>
                           <!--  this.$route 挂载的是router相关的属性 this.$router 挂载的router相关的方法 -->
                           <!-- 
                                  el:
                                  scope.row表示当前这一行数据(自己本身)
                                  如果$router.push(url)不加/
                                  这不会从根路径开始
                            -->
                            <el-button type="primary" size="small" @click='$router.push(`/videos/edit/${scope.row._id}`)'>编辑</el-button>

                             <el-button type="primary" size="small" @click='remove(scope.row)'>删除</el-button>
                     </template>
              </el-table-column>
        </el-table>
 </div>
</template>

<script>
export default {
 data() {
  return {
         videos:[]
  }
 },
 methods:{
        //便与以后重新调用
        async fetch(){
             const res = await this.$http.get("rest/videos")
             this.videos = res.data
        },
        async remove(row){
         this.$confirm(`是否要删除分类${row.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //点击确认按钮 既执行删除
          await this.$http.delete(`rest/videos/${row._id}`)
          this.$message({
              type: 'success',
              message: '删除成功!'
         });
         //重新获取一下数据
         this.fetch()
        })
        }
 },
 created(){
        this.fetch()
 },
 components: {

 }
}
</script>

<style scoped lang="scss">

</style>
