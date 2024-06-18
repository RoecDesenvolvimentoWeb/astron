import { ReactElement } from "react";

interface IMolRowRewardTaskProps {
    title: string
    application: "all" | "individual"
    period: string
    cycle: number
    taskType: string
    isActive: boolean
    onEditAction: (application: "all" | "individual") => unknown
    onChangeStatus: (paused: boolean) => unknown
    onDelete: () => unknown
}

export const MolRowRewardTask = (props: IMolRowRewardTaskProps): ReactElement => {
    const handlePauseUnpause = (isToPause: boolean): void => {
        props.onChangeStatus(isToPause)
    }
    const handleEditTask = (): void => {
        props.onEditAction(props.application)
    }
    const pauseUnpauseBtn = props.isActive ? (
        <svg onClick={(): void => {
            handlePauseUnpause(true)
        }} className="cursor-pointer" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_543_1995)">
                <rect x="4.5166" width="40" height="40" rx="20" fill="#FEFEFE" shape-rendering="crispEdges"/>
                <path d="M20.0096 15.4977C20.0096 14.7787 20.5868 14.1977 21.3038 14.1977C22.0228 14.1977 22.6096 14.7807 22.6096 15.4977V15.5152V15.5328V15.5503V15.5679V15.5854V15.603V15.6205V15.6381V15.6556V15.6732V15.6907V15.7083V15.7258V15.7434V15.7609V15.7785V15.796V15.8136V15.8311V15.8487V15.8662V15.8838V15.9013V15.9189V15.9364V15.954V15.9715V15.9891V16.0066V16.0242V16.0417V16.0593V16.0768V16.0944V16.1119V16.1295V16.147V16.1646V16.1821V16.1997V16.2172V16.2348V16.2523V16.2699V16.2874V16.305V16.3225V16.3401V16.3576V16.3752V16.3927V16.4103V16.4278V16.4454V16.4629V16.4805V16.498V16.5156V16.5331V16.5507V16.5682V16.5858V16.6033V16.6209V16.6384V16.656V16.6735V16.6911V16.7086V16.7262V16.7437V16.7613V16.7788V16.7964V16.8139V16.8315V16.849V16.8666V16.8841V16.9017V16.9192V16.9368V16.9543V16.9719V16.9894V17.007V17.0245V17.0421V17.0596V17.0772V17.0947V17.1123V17.1298V17.1474V17.1649V17.1825V17.2V17.2176V17.2351V17.2527V17.2702V17.2878V17.3053V17.3229V17.3404V17.358V17.3755V17.3931V17.4106V17.4282V17.4457V17.4633V17.4808V17.4984V17.5159V17.5335V17.551V17.5686V17.5861V17.6037V17.6212V17.6388V17.6563V17.6739V17.6914V17.709V17.7266V17.7441V17.7617V17.7792V17.7968V17.8143V17.8319V17.8494V17.867V17.8845V17.9021V17.9196V17.9372V17.9547V17.9723V17.9898V18.0074V18.0249V18.0425V18.06V18.0776V18.0952V18.1127V18.1303V18.1478V18.1654V18.1829V18.2005V18.218V18.2356V18.2531V18.2707V18.2882V18.3058V18.3234V18.3409V18.3585V18.376V18.3936V18.4111V18.4287V18.4462V18.4638V18.4813V18.4989V18.5165V18.534V18.5516V18.5691V18.5867V18.6042V18.6218V18.6394V18.6569V18.6745V18.692V18.7096V18.7271V18.7447V18.7622V18.7798V18.7974V18.8149V18.8325V18.85V18.8676V18.8852V18.9027V18.9203V18.9378V18.9554V18.9729V18.9905V19.0081V19.0256V19.0432V19.0607V19.0783V19.0959V19.1134V19.131V19.1485V19.1661V19.1837V19.2012V19.2188V19.2363V19.2539V19.2715V19.289V19.3066V19.3241V19.3417V19.3593V19.3768V19.3944V19.412V19.4295V19.4471V19.4646V19.4822V19.4998V19.5173V19.5349V19.5525V19.57V19.5876V19.6051V19.6227V19.6403V19.6578V19.6754V19.693V19.7105V19.7281V19.7457V19.7632V19.7808V19.7984V19.8159V19.8335V19.8511V19.8686V19.8862V19.9038V19.9213V19.9389V19.9565V19.974V19.9916V20.0092V20.0267V20.0443V20.0619V20.0794V20.097V20.1146V20.1321V20.1497V20.1673V20.1849V20.2024V20.22V20.2376V20.2551V20.2727V20.2903V20.3079V20.3254V20.343V20.3606V20.3781V20.3957V20.4133V20.4309V20.4484V20.466V20.4836V20.5011V20.5187V20.5363V20.5539V20.5714V20.589V20.6066V20.6242V20.6417V20.6593V20.6769V20.6945V20.712V20.7296V20.7472V20.7648V20.7824V20.7999V20.8175V20.8351V20.8527V20.8702V20.8878V20.9054V20.923V20.9406V20.9581V20.9757V20.9933V21.0109V21.0285V21.046V21.0636V21.0812V21.0988V21.1164V21.1339V21.1515V21.1691V21.1867V21.2043V21.2219V21.2394V21.257V21.2746V21.2922V21.3098V21.3274V21.3449V21.3625V21.3801V21.3977V21.4153V21.4329V21.4505V21.468V21.4856V21.5032V21.5208V21.5384V21.556V21.5736V21.5912V21.6087V21.6263V21.6439V21.6615V21.6791V21.6967V21.7143V21.7319V21.7495V21.7671V21.7847V21.8022V21.8198V21.8374V21.855V21.8726V21.8902V21.9078V21.9254V21.943V21.9606V21.9782V21.9958V22.0134V22.031V22.0486V22.0662V22.0838V22.1013V22.1189V22.1365V22.1541V22.1717V22.1893V22.2069V22.2245V22.2421V22.2597V22.2773V22.2949V22.3125V22.3301V22.3477V22.3653V22.3829V22.4005V22.4181V22.4357V22.4533V22.471V22.4886V22.5062V22.5238V22.5414V22.559V22.5766V22.5942V22.6118V22.6294V22.647V22.6646V22.6822V22.6998V22.7174V22.735V22.7526V22.7703V22.7879V22.8055V22.8231V22.8407V22.8583V22.8759V22.8935V22.9111V22.9287V22.9464V22.964V22.9816V22.9992V23.0168V23.0344V23.052V23.0697V23.0873V23.1049V23.1225V23.1401V23.1577V23.1754V23.193V23.2106V23.2282V23.2458V23.2634V23.2811V23.2987V23.3163V23.3339V23.3515V23.3692V23.3868V23.4044V23.422V23.4396V23.4573V23.4749V23.4925V23.5101V23.5278V23.5454V23.563V23.5806V23.5983V23.6159V23.6335V23.6511V23.6688V23.6864V23.704V23.7216V23.7393V23.7569V23.7745V23.7922V23.8098V23.8274V23.8451V23.8627V23.8803V23.898V23.9156V23.9332V23.9508V23.9685V23.9861V24.0037V24.0214V24.039V24.0567V24.0743V24.0919V24.1096V24.1272V24.1448V24.1625V24.1801V24.1978V24.2154V24.233V24.2507V24.2683V24.286V24.3036V24.3212V24.3389V24.3565V24.3742V24.3918V24.4095V24.4271V24.4447V24.4624V24.48V24.4977C22.6096 25.2187 22.0418 25.7977 21.3269 25.7977C20.6059 25.7977 20.0096 25.2127 20.0096 24.4977V24.4801V24.4625V24.4449V24.4273V24.4098V24.3922V24.3746V24.357V24.3394V24.3218V24.3042V24.2867V24.2691V24.2515V24.2339V24.2163V24.1988V24.1812V24.1636V24.146V24.1284V24.1108V24.0933V24.0757V24.0581V24.0405V24.0229V24.0054V23.9878V23.9702V23.9526V23.935V23.9175V23.8999V23.8823V23.8647V23.8471V23.8296V23.812V23.7944V23.7768V23.7592V23.7417V23.7241V23.7065V23.6889V23.6713V23.6538V23.6362V23.6186V23.601V23.5835V23.5659V23.5483V23.5307V23.5132V23.4956V23.478V23.4604V23.4428V23.4253V23.4077V23.3901V23.3725V23.355V23.3374V23.3198V23.3022V23.2847V23.2671V23.2495V23.2319V23.2144V23.1968V23.1792V23.1616V23.1441V23.1265V23.1089V23.0914V23.0738V23.0562V23.0386V23.0211V23.0035V22.9859V22.9683V22.9508V22.9332V22.9156V22.8981V22.8805V22.8629V22.8453V22.8278V22.8102V22.7926V22.775V22.7575V22.7399V22.7223V22.7048V22.6872V22.6696V22.652V22.6345V22.6169V22.5993V22.5818V22.5642V22.5466V22.5291V22.5115V22.4939V22.4763V22.4588V22.4412V22.4236V22.4061V22.3885V22.3709V22.3534V22.3358V22.3182V22.3006V22.2831V22.2655V22.2479V22.2304V22.2128V22.1952V22.1777V22.1601V22.1425V22.125V22.1074V22.0898V22.0723V22.0547V22.0371V22.0195V22.002V21.9844V21.9668V21.9493V21.9317V21.9141V21.8966V21.879V21.8614V21.8439V21.8263V21.8087V21.7912V21.7736V21.756V21.7385V21.7209V21.7033V21.6858V21.6682V21.6506V21.6331V21.6155V21.5979V21.5804V21.5628V21.5452V21.5277V21.5101V21.4925V21.475V21.4574V21.4398V21.4223V21.4047V21.3871V21.3696V21.352V21.3344V21.3169V21.2993V21.2817V21.2642V21.2466V21.229V21.2115V21.1939V21.1763V21.1588V21.1412V21.1236V21.1061V21.0885V21.0709V21.0534V21.0358V21.0182V21.0007V20.9831V20.9655V20.948V20.9304V20.9128V20.8953V20.8777V20.8601V20.8426V20.825V20.8074V20.7899V20.7723V20.7547V20.7372V20.7196V20.702V20.6845V20.6669V20.6493V20.6318V20.6142V20.5966V20.5791V20.5615V20.5439V20.5264V20.5088V20.4912V20.4737V20.4561V20.4385V20.421V20.4034V20.3858V20.3683V20.3507V20.3331V20.3156V20.298V20.2804V20.2629V20.2453V20.2277V20.2101V20.1926V20.175V20.1574V20.1399V20.1223V20.1047V20.0872V20.0696V20.052V20.0345V20.0169V19.9993V19.9818V19.9642V19.9466V19.9291V19.9115V19.8939V19.8764V19.8588V19.8412V19.8237V19.8061V19.7885V19.771V19.7534V19.7358V19.7182V19.7007V19.6831V19.6655V19.648V19.6304V19.6128V19.5953V19.5777V19.5601V19.5426V19.525V19.5074V19.4898V19.4723V19.4547V19.4371V19.4196V19.402V19.3844V19.3669V19.3493V19.3317V19.3141V19.2966V19.279V19.2614V19.2439V19.2263V19.2087V19.1911V19.1736V19.156V19.1384V19.1209V19.1033V19.0857V19.0681V19.0506V19.033V19.0154V18.9979V18.9803V18.9627V18.9451V18.9276V18.91V18.8924V18.8748V18.8573V18.8397V18.8221V18.8046V18.787V18.7694V18.7518V18.7343V18.7167V18.6991V18.6815V18.664V18.6464V18.6288V18.6112V18.5937V18.5761V18.5585V18.5409V18.5234V18.5058V18.4882V18.4706V18.4531V18.4355V18.4179V18.4003V18.3828V18.3652V18.3476V18.33V18.3125V18.2949V18.2773V18.2597V18.2421V18.2246V18.207V18.1894V18.1718V18.1543V18.1367V18.1191V18.1015V18.0839V18.0664V18.0488V18.0312V18.0136V17.996V17.9785V17.9609V17.9433V17.9257V17.9081V17.8906V17.873V17.8554V17.8378V17.8202V17.8027V17.7851V17.7675V17.7499V17.7323V17.7147V17.6972V17.6796V17.662V17.6444V17.6268V17.6092V17.5917V17.5741V17.5565V17.5389V17.5213V17.5037V17.4862V17.4686V17.451V17.4334V17.4158V17.3982V17.3806V17.3631V17.3455V17.3279V17.3103V17.2927V17.2751V17.2575V17.24V17.2224V17.2048V17.1872V17.1696V17.152V17.1344V17.1168V17.0992V17.0817V17.0641V17.0465V17.0289V17.0113V16.9937V16.9761V16.9585V16.9409V16.9233V16.9058V16.8882V16.8706V16.853V16.8354V16.8178V16.8002V16.7826V16.765V16.7474V16.7298V16.7122V16.6946V16.6771V16.6595V16.6419V16.6243V16.6067V16.5891V16.5715V16.5539V16.5363V16.5187V16.5011V16.4835V16.4659V16.4483V16.4307V16.4131V16.3955V16.3779V16.3603V16.3427V16.3251V16.3075V16.2899V16.2723V16.2547V16.2371V16.2195V16.2019V16.1843V16.1667V16.1491V16.1315V16.1139V16.0963V16.0787V16.0611V16.0435V16.0259V16.0083V15.9907V15.9731V15.9555V15.9379V15.9203V15.9027V15.8851V15.8675V15.8499V15.8322V15.8146V15.797V15.7794V15.7618V15.7442V15.7266V15.709V15.6914V15.6738V15.6562V15.6386V15.621V15.6033V15.5857V15.5681V15.5505V15.5329V15.5153V15.4977Z" fill="#32063D" stroke="#FEFEFE" stroke-width="0.4"/>
                <path d="M27.742 25.8023C27.0209 25.8023 26.4236 25.2171 26.4236 24.5023V24.4847V24.4671V24.4495V24.4318V24.4142V24.3966V24.379V24.3614V24.3438V24.3262V24.3085V24.2909V24.2733V24.2557V24.2381V24.2205V24.2029V24.1852V24.1676V24.15V24.1324V24.1148V24.0972V24.0796V24.062V24.0444V24.0268V24.0092V23.9915V23.9739V23.9563V23.9387V23.9211V23.9035V23.8859V23.8683V23.8507V23.8331V23.8155V23.7979V23.7803V23.7627V23.7451V23.7275V23.7099V23.6923V23.6747V23.6571V23.6395V23.6219V23.6043V23.5867V23.5691V23.5515V23.5339V23.5163V23.4987V23.4811V23.4635V23.4459V23.4283V23.4107V23.3931V23.3755V23.3579V23.3403V23.3227V23.3052V23.2876V23.27V23.2524V23.2348V23.2172V23.1996V23.182V23.1644V23.1468V23.1292V23.1116V23.0941V23.0765V23.0589V23.0413V23.0237V23.0061V22.9885V22.9709V22.9533V22.9358V22.9182V22.9006V22.883V22.8654V22.8478V22.8302V22.8127V22.7951V22.7775V22.7599V22.7423V22.7247V22.7071V22.6896V22.672V22.6544V22.6368V22.6192V22.6017V22.5841V22.5665V22.5489V22.5313V22.5137V22.4962V22.4786V22.461V22.4434V22.4258V22.4083V22.3907V22.3731V22.3555V22.338V22.3204V22.3028V22.2852V22.2676V22.2501V22.2325V22.2149V22.1973V22.1798V22.1622V22.1446V22.127V22.1095V22.0919V22.0743V22.0567V22.0392V22.0216V22.004V21.9864V21.9689V21.9513V21.9337V21.9161V21.8986V21.881V21.8634V21.8458V21.8283V21.8107V21.7931V21.7756V21.758V21.7404V21.7228V21.7053V21.6877V21.6701V21.6526V21.635V21.6174V21.5999V21.5823V21.5647V21.5471V21.5296V21.512V21.4944V21.4769V21.4593V21.4417V21.4242V21.4066V21.389V21.3715V21.3539V21.3363V21.3188V21.3012V21.2836V21.2661V21.2485V21.2309V21.2134V21.1958V21.1782V21.1607V21.1431V21.1255V21.108V21.0904V21.0728V21.0553V21.0377V21.0201V21.0026V20.985V20.9674V20.9499V20.9323V20.9147V20.8972V20.8796V20.862V20.8445V20.8269V20.8094V20.7918V20.7742V20.7567V20.7391V20.7215V20.704V20.6864V20.6688V20.6513V20.6337V20.6162V20.5986V20.581V20.5635V20.5459V20.5283V20.5108V20.4932V20.4757V20.4581V20.4405V20.423V20.4054V20.3878V20.3703V20.3527V20.3352V20.3176V20.3V20.2825V20.2649V20.2473V20.2298V20.2122V20.1947V20.1771V20.1595V20.142V20.1244V20.1069V20.0893V20.0717V20.0542V20.0366V20.019V20.0015V19.9839V19.9664V19.9488V19.9312V19.9137V19.8961V19.8786V19.861V19.8434V19.8259V19.8083V19.7908V19.7732V19.7556V19.7381V19.7205V19.703V19.6854V19.6678V19.6503V19.6327V19.6151V19.5976V19.58V19.5625V19.5449V19.5273V19.5098V19.4922V19.4747V19.4571V19.4395V19.422V19.4044V19.3869V19.3693V19.3517V19.3342V19.3166V19.299V19.2815V19.2639V19.2464V19.2288V19.2112V19.1937V19.1761V19.1586V19.141V19.1234V19.1059V19.0883V19.0707V19.0532V19.0356V19.0181V19.0005V18.9829V18.9654V18.9478V18.9302V18.9127V18.8951V18.8776V18.86V18.8424V18.8249V18.8073V18.7897V18.7722V18.7546V18.7371V18.7195V18.7019V18.6844V18.6668V18.6492V18.6317V18.6141V18.5965V18.579V18.5614V18.5439V18.5263V18.5087V18.4912V18.4736V18.456V18.4385V18.4209V18.4033V18.3858V18.3682V18.3506V18.3331V18.3155V18.2979V18.2804V18.2628V18.2452V18.2277V18.2101V18.1925V18.175V18.1574V18.1398V18.1223V18.1047V18.0871V18.0696V18.052V18.0344V18.0169V17.9993V17.9817V17.9642V17.9466V17.929V17.9115V17.8939V17.8763V17.8588V17.8412V17.8236V17.806V17.7885V17.7709V17.7533V17.7358V17.7182V17.7006V17.683V17.6655V17.6479V17.6303V17.6128V17.5952V17.5776V17.56V17.5425V17.5249V17.5073V17.4897V17.4722V17.4546V17.437V17.4195V17.4019V17.3843V17.3667V17.3492V17.3316V17.314V17.2964V17.2789V17.2613V17.2437V17.2261V17.2085V17.191V17.1734V17.1558V17.1382V17.1207V17.1031V17.0855V17.0679V17.0503V17.0328V17.0152V16.9976V16.98V16.9625V16.9449V16.9273V16.9097V16.8921V16.8745V16.857V16.8394V16.8218V16.8042V16.7866V16.7691V16.7515V16.7339V16.7163V16.6987V16.6811V16.6636V16.646V16.6284V16.6108V16.5932V16.5756V16.558V16.5405V16.5229V16.5053V16.4877V16.4701V16.4525V16.4349V16.4173V16.3998V16.3822V16.3646V16.347V16.3294V16.3118V16.2942V16.2766V16.259V16.2414V16.2239V16.2063V16.1887V16.1711V16.1535V16.1359V16.1183V16.1007V16.0831V16.0655V16.0479V16.0303V16.0127V15.9951V15.9775V15.9599V15.9423V15.9248V15.9072V15.8896V15.872V15.8544V15.8368V15.8192V15.8016V15.784V15.7664V15.7488V15.7312V15.7136V15.696V15.6784V15.6608V15.6432V15.6256V15.6079V15.5903V15.5727V15.5551V15.5375V15.5199V15.5023C26.4236 14.7828 26.9983 14.2023 27.7147 14.2023C28.4343 14.2023 29.0236 14.7859 29.0236 15.5023V15.5199V15.5375V15.555V15.5726V15.5902V15.6078V15.6253V15.6429V15.6605V15.6781V15.6956V15.7132V15.7308V15.7484V15.7659V15.7835V15.8011V15.8187V15.8362V15.8538V15.8714V15.889V15.9065V15.9241V15.9417V15.9592V15.9768V15.9944V16.012V16.0295V16.0471V16.0647V16.0823V16.0998V16.1174V16.135V16.1525V16.1701V16.1877V16.2053V16.2228V16.2404V16.258V16.2755V16.2931V16.3107V16.3282V16.3458V16.3634V16.381V16.3985V16.4161V16.4337V16.4512V16.4688V16.4864V16.5039V16.5215V16.5391V16.5567V16.5742V16.5918V16.6094V16.6269V16.6445V16.6621V16.6796V16.6972V16.7148V16.7323V16.7499V16.7675V16.785V16.8026V16.8202V16.8377V16.8553V16.8729V16.8904V16.908V16.9256V16.9431V16.9607V16.9783V16.9958V17.0134V17.031V17.0485V17.0661V17.0837V17.1012V17.1188V17.1364V17.1539V17.1715V17.1891V17.2066V17.2242V17.2418V17.2593V17.2769V17.2945V17.312V17.3296V17.3472V17.3647V17.3823V17.3999V17.4174V17.435V17.4526V17.4701V17.4877V17.5053V17.5228V17.5404V17.558V17.5755V17.5931V17.6107V17.6282V17.6458V17.6634V17.6809V17.6985V17.716V17.7336V17.7512V17.7687V17.7863V17.8039V17.8214V17.839V17.8566V17.8741V17.8917V17.9093V17.9268V17.9444V17.962V17.9795V17.9971V18.0146V18.0322V18.0498V18.0673V18.0849V18.1025V18.12V18.1376V18.1552V18.1727V18.1903V18.2079V18.2254V18.243V18.2606V18.2781V18.2957V18.3132V18.3308V18.3484V18.3659V18.3835V18.4011V18.4186V18.4362V18.4538V18.4713V18.4889V18.5065V18.524V18.5416V18.5591V18.5767V18.5943V18.6118V18.6294V18.647V18.6645V18.6821V18.6997V18.7172V18.7348V18.7524V18.7699V18.7875V18.8051V18.8226V18.8402V18.8577V18.8753V18.8929V18.9104V18.928V18.9456V18.9631V18.9807V18.9983V19.0158V19.0334V19.051V19.0685V19.0861V19.1037V19.1212V19.1388V19.1564V19.1739V19.1915V19.209V19.2266V19.2442V19.2617V19.2793V19.2969V19.3144V19.332V19.3496V19.3671V19.3847V19.4023V19.4198V19.4374V19.455V19.4725V19.4901V19.5077V19.5252V19.5428V19.5604V19.5779V19.5955V19.6131V19.6306V19.6482V19.6658V19.6833V19.7009V19.7185V19.736V19.7536V19.7712V19.7887V19.8063V19.8239V19.8414V19.859V19.8766V19.8941V19.9117V19.9293V19.9468V19.9644V19.982V19.9996V20.0171V20.0347V20.0523V20.0698V20.0874V20.105V20.1225V20.1401V20.1577V20.1752V20.1928V20.2104V20.228V20.2455V20.2631V20.2807V20.2982V20.3158V20.3334V20.3509V20.3685V20.3861V20.4037V20.4212V20.4388V20.4564V20.4739V20.4915V20.5091V20.5266V20.5442V20.5618V20.5794V20.5969V20.6145V20.6321V20.6497V20.6672V20.6848V20.7024V20.7199V20.7375V20.7551V20.7727V20.7902V20.8078V20.8254V20.843V20.8605V20.8781V20.8957V20.9132V20.9308V20.9484V20.966V20.9835V21.0011V21.0187V21.0363V21.0538V21.0714V21.089V21.1066V21.1241V21.1417V21.1593V21.1769V21.1944V21.212V21.2296V21.2472V21.2648V21.2823V21.2999V21.3175V21.3351V21.3526V21.3702V21.3878V21.4054V21.423V21.4405V21.4581V21.4757V21.4933V21.5108V21.5284V21.546V21.5636V21.5812V21.5987V21.6163V21.6339V21.6515V21.6691V21.6866V21.7042V21.7218V21.7394V21.757V21.7745V21.7921V21.8097V21.8273V21.8449V21.8625V21.88V21.8976V21.9152V21.9328V21.9504V21.968V21.9855V22.0031V22.0207V22.0383V22.0559V22.0735V22.091V22.1086V22.1262V22.1438V22.1614V22.179V22.1966V22.2141V22.2317V22.2493V22.2669V22.2845V22.3021V22.3197V22.3372V22.3548V22.3724V22.39V22.4076V22.4252V22.4428V22.4604V22.478V22.4955V22.5131V22.5307V22.5483V22.5659V22.5835V22.6011V22.6187V22.6363V22.6539V22.6714V22.689V22.7066V22.7242V22.7418V22.7594V22.777V22.7946V22.8122V22.8298V22.8474V22.865V22.8826V22.9002V22.9178V22.9353V22.9529V22.9705V22.9881V23.0057V23.0233V23.0409V23.0585V23.0761V23.0937V23.1113V23.1289V23.1465V23.1641V23.1817V23.1993V23.2169V23.2345V23.2521V23.2697V23.2873V23.3049V23.3225V23.3401V23.3577V23.3753V23.3929V23.4105V23.4281V23.4457V23.4633V23.4809V23.4985V23.5161V23.5337V23.5513V23.5689V23.5865V23.6041V23.6217V23.6393V23.6569V23.6745V23.6922V23.7098V23.7274V23.745V23.7626V23.7802V23.7978V23.8154V23.833V23.8506V23.8682V23.8858V23.9034V23.9211V23.9387V23.9563V23.9739V23.9915V24.0091V24.0267V24.0443V24.0619V24.0795V24.0972V24.1148V24.1324V24.15V24.1676V24.1852V24.2028V24.2205V24.2381V24.2557V24.2733V24.2909V24.3085V24.3261V24.3438V24.3614V24.379V24.3966V24.4142V24.4318V24.4495V24.4671V24.4847V24.5023C29.0236 25.2235 28.4568 25.8023 27.742 25.8023Z" fill="#32063D" stroke="#FEFEFE" stroke-width="0.4"/>
            </g>
            <defs>
                <filter id="filter0_d_543_1995" x="0.516602" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_543_1995"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_543_1995" result="shape"/>
                </filter>
            </defs>
        </svg>
    ) : (
        <svg onClick={(): void => {
            handlePauseUnpause(false)
        }} className="cursor-pointer" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_492_2216)">
                <rect x="4.5166" width="40" height="40" rx="20" fill="#6C037D" shape-rendering="crispEdges"/>
                <path d="M19.3551 20.0097C19.3551 18.2492 19.361 16.4888 19.3516 14.7284C19.3493 14.194 19.4538 13.7219 19.9693 13.4588C20.4626 13.2075 20.8959 13.3755 21.3234 13.6714C23.8413 15.4154 26.3687 17.1476 28.8913 18.8846C29.9365 19.6045 29.9447 20.3902 28.9101 21.1042C26.3757 22.8517 23.8378 24.5934 21.3058 26.3444C20.876 26.6415 20.4368 26.7895 19.9494 26.5288C19.4585 26.2669 19.3504 25.81 19.3528 25.2921C19.3598 23.5305 19.3551 21.7701 19.3551 20.0097Z" fill="#FEFEFE"/>
            </g>
            <defs>
                <filter id="filter0_d_492_2216" x="0.516602" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0.15 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_492_2216"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_492_2216" result="shape"/>
                </filter>
            </defs>
        </svg>
    )

    return (
        <>
            <tr>
                <td className="pl-[15px]">
                    {props.title}
                </td>
                <td>
                    {/** It should show icons for the given application */}
                    {props.application === "all" ? "Todos" : "Individual"}
                </td>
                <td>
                    {props.period}
                </td>
                <td>
                    {props.cycle}
                </td>
                <td>
                    {props.taskType}
                </td>
                <td className="flex flex-row gap-x-[16px] items-center">
                    <>
                        <div onClick={props.onDelete} className="p-[0.61rem] rounded-full shadow-md bg-red-500 cursor-pointer h-fit">
                            <svg
                                fill="#000000"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
	                            width="20px" height="20px" viewBox="0 0 482.428 482.429"
                                className="stroke-white fill-none stroke-[18px]"
	                            xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                                        c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                                        h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                                        C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                                        C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                                        c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                                        c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                                        V115.744z"/>
                                        <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			                        c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                                        <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			                            c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                                        <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			                            c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </>
                    <>
                        <svg onClick={handleEditTask} className="cursor-pointer" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_543_1994)">
                                <rect x="4.52051" width="39.996" height="40" rx="19.998" fill="#FEFEFE" shape-rendering="crispEdges"/>
                                <path d="M17.651 27.85C17.4961 27.8491 17.3436 27.8118 17.2058 27.741C17.067 27.6697 16.9471 27.5664 16.8559 27.4396C16.7648 27.3129 16.7051 27.1663 16.6817 27.012C16.6582 26.8577 16.6718 26.7 16.7212 26.5519L16.7213 26.5518L18.1087 22.38L18.1096 22.3785C18.1122 22.3735 18.1181 22.3626 18.123 22.3487C18.1251 22.3429 18.1272 22.3362 18.129 22.3286L18.1359 22.3109C18.1527 22.2715 18.1727 22.2335 18.1957 22.1973L18.2111 22.175L18.2111 22.175L18.2122 22.1735C18.2393 22.1332 18.2701 22.0955 18.3041 22.0608C18.3043 22.0606 18.3044 22.0605 18.3046 22.0604L27.38 12.985C27.3802 12.9848 27.3804 12.9846 27.3806 12.9843C27.9333 12.4451 28.6762 12.1454 29.4484 12.1501C30.2209 12.1547 30.9604 12.4637 31.5066 13.0099C32.0528 13.5561 32.3618 14.2956 32.3664 15.0681C32.3711 15.8402 32.0714 16.5831 31.5322 17.1359C31.532 17.1361 31.5317 17.1363 31.5315 17.1365L22.458 26.2062C22.4579 26.2064 22.4577 26.2065 22.4576 26.2066C22.4229 26.2407 22.3852 26.2715 22.3449 26.2986L22.3438 26.2994L22.3156 26.3188C22.2792 26.3419 22.2409 26.3621 22.2012 26.379L22.1743 26.3898L22.23 26.529L22.1743 26.3898L22.1405 26.4033L17.9646 27.7952L17.9646 27.7952L17.963 27.7958C17.8626 27.8305 17.7573 27.8488 17.651 27.85ZM19.3865 24.2705L19.2149 24.0989L19.1382 24.3291L18.7084 25.6183L18.6136 25.9029L18.8982 25.8081L20.1874 25.3783L20.4176 25.3016L20.246 25.13L19.3865 24.2705ZM27.0973 15.7248L26.9912 15.6187L26.8851 15.7249L20.1001 22.5175L19.9941 22.6235L20.1001 22.7296L21.7869 24.4163L21.8929 24.5223L21.999 24.4164L28.7916 17.6314L28.8978 17.5253L28.7916 17.4192L27.0973 15.7248ZM30.5989 14.3661H30.6645L30.4061 14.1096C30.1535 13.8589 29.8118 13.7186 29.4559 13.7194C29.1 13.7202 28.759 13.862 28.5075 14.1139L28.2312 14.3902L28.1251 14.4963L28.2312 14.6023L29.9142 16.2853L30.021 16.3921L30.127 16.2846L30.3991 16.0088C30.3992 16.0087 30.3992 16.0086 30.3993 16.0085C30.6504 15.7565 30.7914 15.4152 30.7914 15.0595C30.7914 14.8131 30.7238 14.5737 30.5989 14.3661Z" fill="#32063D" stroke="#FEFEFE" stroke-width="0.3"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_543_1994" x="0.520508" y="0" width="47.9961" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="4"/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0 0.220833 0 0 0 0.15 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_543_1994"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_543_1994" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                    </>
                    <>
                        {pauseUnpauseBtn}
                    </>
                </td>
            </tr>
        </>
    )
}