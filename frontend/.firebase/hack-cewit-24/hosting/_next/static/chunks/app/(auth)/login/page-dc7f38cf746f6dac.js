(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[665],{1833:function(e,t,r){Promise.resolve().then(r.bind(r,8956))},8956:function(e,t,r){"use strict";r.r(t);var s=r(7437),l=r(2265),n=r(135),i=r(3904),a=r(2233),o=r(4065),d=r(6990),c=r(4458),u=r(677),m=r(7867),f=r(9376),x=r(2045),h=r(8556);t.default=()=>{let[e,t]=l.useState(null),r=o.ZP.object({email:o.ZP.string().email("Invalid email").min(1,"Email is required"),password:o.ZP.string().min(8,"Password must be at least 8 characters")}),p=(0,c.cI)({resolver:(0,d.F)(r)}),g=p.handleSubmit(e=>{try{h.Z.post("https://limitless-peak-59293-d6aba82fe752.herokuapp.com/login",e)}catch(e){console.log(e)}}),v=(0,m.useRouter)();return(0,s.jsx)(x.W,{children:(0,s.jsx)(n.l0,{...p,children:(0,s.jsxs)("form",{onSubmit:g,className:"",children:[(0,s.jsx)(n.Wi,{control:p.control,name:"email",render:e=>{let{field:t}=e;return(0,s.jsxs)(n.xJ,{children:[(0,s.jsx)(n.NI,{children:(0,s.jsx)(i.I,{placeholder:"Email",...t})}),(0,s.jsx)(n.zG,{})]})}}),(0,s.jsx)(n.Wi,{control:p.control,name:"password",render:e=>{let{field:t}=e;return(0,s.jsxs)(n.xJ,{children:[(0,s.jsx)(n.NI,{children:(0,s.jsx)(i.I,{placeholder:"Password",type:"password",...t})}),(0,s.jsx)(n.zG,{})]})}}),(0,s.jsx)(f.Z,{className:"w-full flex items-center justify-center rounded-md h-fit",sitekey:"6LfccIcpAAAAAJxHaqqJLfpJ5HQYZAj3mOw9Hxqz",onChange:e=>{t(e)}}),(0,s.jsx)(a.z,{disabled:p.formState.isSubmitting&&!e,onClick:()=>{v.push("/")},className:"w-full",children:"Login"}),(0,s.jsx)(u.default,{href:"/signup",children:"Don't have an account?"})]})})})}},2233:function(e,t,r){"use strict";r.d(t,{z:function(){return d}});var s=r(7437),l=r(2265),n=r(6260),i=r(8495),a=r(345);let o=(0,i.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=l.forwardRef((e,t)=>{let{className:r,variant:l,size:i,asChild:d=!1,...c}=e,u=d?n.g7:"button";return(0,s.jsx)(u,{className:(0,a.cn)(o({variant:l,size:i,className:r})),ref:t,...c})});d.displayName="Button"},135:function(e,t,r){"use strict";r.d(t,{l0:function(){return u},NI:function(){return g},Wi:function(){return f},xJ:function(){return p},zG:function(){return v}});var s=r(7437),l=r(2265),n=r(6260),i=r(4458),a=r(345),o=r(9512);let d=(0,r(8495).j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=l.forwardRef((e,t)=>{let{className:r,...l}=e;return(0,s.jsx)(o.f,{ref:t,className:(0,a.cn)(d(),r),...l})});c.displayName=o.f.displayName;let u=i.RV,m=l.createContext({}),f=e=>{let{...t}=e;return(0,s.jsx)(m.Provider,{value:{name:t.name},children:(0,s.jsx)(i.Qr,{...t})})},x=()=>{let e=l.useContext(m),t=l.useContext(h),{getFieldState:r,formState:s}=(0,i.Gc)(),n=r(e.name,s);if(!e)throw Error("useFormField should be used within <FormField>");let{id:a}=t;return{id:a,name:e.name,formItemId:`${a}-form-item`,formDescriptionId:`${a}-form-item-description`,formMessageId:`${a}-form-item-message`,...n}},h=l.createContext({}),p=l.forwardRef((e,t)=>{let{className:r,...n}=e,i=l.useId();return(0,s.jsx)(h.Provider,{value:{id:i},children:(0,s.jsx)("div",{ref:t,className:(0,a.cn)("space-y-2",r),...n})})});p.displayName="FormItem",l.forwardRef((e,t)=>{let{className:r,...l}=e,{error:n,formItemId:i}=x();return(0,s.jsx)(c,{ref:t,className:(0,a.cn)(n&&"text-destructive",r),htmlFor:i,...l})}).displayName="FormLabel";let g=l.forwardRef((e,t)=>{let{...r}=e,{error:l,formItemId:i,formDescriptionId:a,formMessageId:o}=x();return(0,s.jsx)(n.g7,{ref:t,id:i,"aria-describedby":l?`${a} ${o}`:`${a}`,"aria-invalid":!!l,...r})});g.displayName="FormControl",l.forwardRef((e,t)=>{let{className:r,...l}=e,{formDescriptionId:n}=x();return(0,s.jsx)("p",{ref:t,id:n,className:(0,a.cn)("text-[0.8rem] text-muted-foreground",r),...l})}).displayName="FormDescription";let v=l.forwardRef((e,t)=>{let{className:r,children:l,...n}=e,{error:i,formMessageId:o}=x(),d=i?String(null==i?void 0:i.message):l;return d?(0,s.jsx)("p",{ref:t,id:o,className:(0,a.cn)("text-[0.8rem] font-medium text-destructive",r),...n,children:d}):null});v.displayName="FormMessage"},3904:function(e,t,r){"use strict";r.d(t,{I:function(){return i}});var s=r(7437),l=r(2265),n=r(345);let i=l.forwardRef((e,t)=>{let{className:r,type:l,...i}=e;return(0,s.jsx)("input",{type:l,className:(0,n.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...i})});i.displayName="Input"},2045:function(e,t,r){"use strict";r.d(t,{W:function(){return o}});var s=r(7437),l=r(8247),n=r(6163),i=r(677);let a=(0,l.AI)(e=>(0,s.jsx)("slot",{children:(0,s.jsx)("section",{className:"bg-white",children:(0,s.jsxs)("div",{className:"lg:grid lg:min-h-screen lg:grid-cols-12",children:[(0,s.jsxs)("section",{className:"relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6",children:[e.v0,(0,s.jsxs)("div",{className:`
                hidden lg:relative lg:block lg:p-12
              `,children:[e.v1,(0,s.jsx)("h2",{className:"mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl",children:"Welcome to Promptlyze \uD83E\uDD16"}),(0,s.jsx)("p",{className:"mt-4 leading-relaxed text-white/90",children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum."})]})]}),(0,s.jsx)("main",{className:"flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6",children:(0,s.jsxs)("div",{className:"max-w-xl lg:max-w-3xl",children:[(0,s.jsxs)("div",{className:"relative -mt-16 block lg:hidden",children:[e.v2,(0,s.jsx)("h1",{className:"mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl",children:"Welcome to Promptlyze \uD83E\uDD16"}),(0,s.jsx)("p",{className:"mt-4 leading-relaxed text-gray-500",children:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum."})]}),e.v3]})})]})})}),{name:"AuthScreen_1",portals:["v0","v1","v2","v3"]}),o=e=>{let{children:t}=e;return(0,s.jsx)(a,{v0:(0,s.jsx)(n.default,{alt:"Night",src:"/assets/images/auth.jpg",className:" absolute inset-0 h-full w-full object-cover opacity-80 ",layout:"fill"}),v1:(0,s.jsxs)(i.default,{className:`
                  block text-white
                `,href:"/",children:[(0,s.jsx)("span",{className:"sr-only",children:"Home"}),(0,s.jsx)(()=>(0,s.jsxs)("svg",{width:"338",height:"512",viewBox:"0 0 338 512",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"w-10 h-10",children:[(0,s.jsx)("path",{d:"M12.2764 512L114.099 413.066V330.742C114.099 330.742 192.09 332.186 214.477 330.742C236.863 329.298 249.14 318.465 257.083 310.522C265.027 302.578 272.248 291.024 272.248 277.303V248.418L235.419 263.583C236.863 282.358 226.031 296.801 212.31 296.801H80.158V397.634L79.8562 397.96C63.984 415.088 57.9773 421.57 48.3836 424.621V265.027H215.199C223.657 264.967 226.753 265.027 235.419 263.583L272.248 248.418C318.465 214.477 337.963 181.98 337.963 133.597C337.963 69.5529 285.247 20.9422 261.416 10.8322C250.456 6.18253 255.639 7.94358 244.085 3.61072C235.76 0.488881 232.604 2.47666e-06 226.753 5.38517e-06H0L62.1044 101.1H212.31C223.142 101.1 236.141 113.377 236.141 124.209L236.863 225.309C251.2 217.081 258.876 211.715 272.248 201.478L271.526 124.209C271.087 117.121 269.448 110.678 267.193 105.433C256.401 80.3219 233.252 66.4372 215.199 66.4372C215.199 66.4372 87.3794 66.4372 82.3244 65.7151C77.2694 64.993 61.1431 34.6629 64.2708 34.6629H223.865C249.862 39.7179 270.082 59.0845 278.748 69.3258C294.635 88.1016 304.023 111.21 302.578 139.374C301.134 167.537 291.273 188.249 272.248 201.478C258.876 211.715 251.2 217.081 236.863 225.309C229.642 228.92 228.626 229.169 220.254 228.92H12.9986L12.2764 512Z",fill:"url(#paint0_linear_2359_89)"}),(0,s.jsx)("defs",{children:(0,s.jsxs)("linearGradient",{id:"paint0_linear_2359_89",x1:"168.982",y1:"0",x2:"168.982",y2:"512",gradientUnits:"userSpaceOnUse",children:[(0,s.jsx)("stop",{"stop-color":"#953783"}),(0,s.jsx)("stop",{offset:"1","stop-color":"#6C2983"})]})})]}),{})]}),v2:(0,s.jsxs)(i.default,{className:"inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20",href:"/",children:[(0,s.jsx)("span",{className:"sr-only",children:"Home"}),(0,s.jsx)(n.default,{src:"/logo.svg",width:150,alt:"logo",height:100})]}),v3:t})}},345:function(e,t,r){"use strict";r.d(t,{cn:function(){return n}});var s=r(435),l=r(9268);function n(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,l.m6)((0,s.W)(t))}}},function(e){e.O(0,[247,12,326,413,786,556,654,971,393,744],function(){return e(e.s=1833)}),_N_E=e.O()}]);