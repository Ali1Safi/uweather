import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  global.lang = { ff: "vr", ffb: " vb" }



  return (
    <div style={{ direction: "rtl", minHeight: "110vh", background: "linear-gradient(230deg, #191970 20%, gainsboro 90%)" }}>
      <br-x />
      <Window title={"Prepared by Turing Team(JUNIOR)"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        <pre style={{ background: "linear-gradient(to left, #006400 20%, gainsboro 90%)" }}>
          <div>
            <div style={{ background: "linear-gradient(to left, #006400 55%, gainsboro 90%)", textAlign: 'center', fontSize: 25, fontWeight: "bold", direction: 'ltr' }}>Region</div>
            <pre style={{ background: "linear-gradient(to right, #006400 20%, gainsboro 90%)", fontWeight: "bold", textAlign:'center' }}>
              <br />
              Country : Iran
              <br />
              <br />
              Province : Fars
              <br />
              <br />
              City : Shiraz
              <br />
              <br />
              Population : {(parseFloat(props.cr.population) as number).toLocaleString("en-EN")}
              <br />
              <br />
            </pre>
            <div style={{ background: "linear-gradient(to right, #006400 55%, gainsboro 90%)", textAlign: 'center', fontSize: 25, fontWeight: "bold", direction: 'ltr' }}>Wether</div>
            <pre style={{ textAlign: 'center', background: "linear-gradient(to left, #006400 20%, gainsboro 90%)", fontWeight: "bold" }}>
              <br/>
              Temperture :{(parseFloat(props.deg.temp_C) as number).toLocaleString("en-EN")}°C
              <br />
              <br />
              Humidity : %{(parseFloat(props.deg.humidity) as number).toLocaleString("en-EN")}
              <br />
              <br />
              Wind :{(parseFloat(props.deg.windspeedMiles) as number).toLocaleString("en-EN")}km
              <br />
              <br />
              Average-temp :{(parseFloat(props.weat.avgtempC) as number).toLocaleString("en-EN")}°C
              , {(parseFloat(props.weat.avgtempF) as number).toLocaleString("en-EN")}°F
              <br />
              <br />
            </pre>
            <div style={{ background: "linear-gradient(to left, #006400 55%, gainsboro 90%)", textAlign: 'center', fontSize: 25, fontWeight: "bold", direction: 'ltr' }}>Astronomy</div>
            <pre style={{ textAlign: 'center', background: "linear-gradient(to left, #006400 20%, gainsboro 90%)", fontWeight: "bold" }}>
              <br />
              Sunrise:{props.weat.astronomy[0].sunrise}
              <br />
              <br />
              Sunset:{props.weat.astronomy[0].sunset}
              <br />
              <br />
            </pre>
            <br />
          </div>
          <br />
        </pre >
      </Window >
      <img src="/junior.jpg" alt="" style={{ height: 120, width: 120, marginBottom: 0, borderRadius: 20, marginTop: 40, marginRight:"43%" }} />

    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let json = await fetch("https://irmapserver.ir/research/api/weather/")
  let data = await json.json()
  let deg = data.current_condition[0]
  let cr = data.nearest_area[0]
  let weat = data.weather[0]

  console.log("weether:", deg)
  console.log("nationalll:", cr)
  console.log("watter:", weat)

  return {
    props: {
      data: global.QSON.stringify({
        deg, cr, weat,
        session,
        // nlangs,
      })
    },
  }
}