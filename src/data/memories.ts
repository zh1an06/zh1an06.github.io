export type Memory={id:number;title:string;image:string;message:string;className:string};
// 修改标题和留言就在这里改；图片替换 public/assets/photos/photo1.jpg ~ photo6.jpg
export const memories:Memory[]=[
{id:1,title:'张家界',image:'/assets/photos/photo1.jpg',message:'故事的开始，是你邀请我去张家界滑雪，两个小女孩的心在慢慢靠近...',className:'left-[1%] top-[15%] rotate-[-10deg]'},
{id:2,title:'天南海北',image:'/assets/photos/photo2.jpg',message:'短短的五一，我们一起去了天（津）南（京）（上）海北（京），留下了很多特别美好的回忆',className:'right-[1%] top-[13%] rotate-[9deg]'},
{id:3,title:'连云港',image:'/assets/photos/photo3.jpg',message:'一起去看海的承诺终于兑现了！看到了美丽的海上日出还吃到了美味的海鲜！',className:'left-[5%] top-[43%] rotate-[5deg]'},
{id:4,title:'无锡',image:'/assets/photos/photo4.jpg',message:'一周年纪念日一起去了无锡追日落，海鸥好壮观，和你好开心^^',className:'right-[5%] top-[42%] rotate-[-6deg] scale-110'},
{id:5,title:'杭州',image:'/assets/photos/photo5.jpg',message:'终于来西湖拍了青白蛇，好美好灵的两个人*^^*',className:'left-[0%] bottom-[8%] rotate-[-5deg]'},
{id:6,title:'未完待续',image:'/assets/photos/photo6.jpg',message:'其实还有好多好多地方，好多好多照片，好多好多回忆，以后也请继续陪伴吧！',className:'right-[0%] bottom-[8%] rotate-[6deg]'}];
