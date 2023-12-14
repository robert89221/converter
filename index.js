
const currencies =
[
  {rate:0, code:"BRL", name:"Brazilian Real"},
  {rate:0, code:"CHF", name:"Swiss Franc"},
  {rate:0, code:"DKK", name:"Danish Krone"},
  {rate:0, code:"EUR", name:"Euro"},
  {rate:0, code:"HUF", name:"Hungarian Forint"},
  {rate:0, code:"ISK", name:"Icelandic Króna"},
  {rate:0, code:"JPY", name:"Japanese Yen"},
  {rate:0, code:"NOK", name:"Norwegian Krone"},
  {rate:0, code:"SEK", name:"Swedish Krona"}
];


function handleInput(idx)
{
  const amount = parseFloat(document.getElementById("field"+idx).value);
  const from = currencies[idx].rate;

  for (i = 0; i < currencies.length; ++i)
  {
    if (i !== idx)
    {
      const newValue = amount*from/currencies[i].rate;
      document.getElementById("field"+i).value = newValue.toFixed(4);
    }
  }
}


function genCurrencyList()
{
  fetchRates().then(rates =>
  {
    let ul = "";
    currencies.forEach((curr, idx) =>
    {
      const currItem = rates[0].rates.find(x => x.code === curr.code);
      curr.rate = currItem.mid;
      const newLi = `<li>${curr.name}<br><input id="field${idx}" type="text" oninput="handleInput(${idx})"/> ${curr.code}</li>`;
      ul += newLi;
    });

    document.getElementById("list").innerHTML = ul;
    const now = new Date(Date.now());
    document.getElementById("timestamp").innerHTML = "Currencies updated at: "+now.toUTCString();
  });

  return ul;
}


async function fetchRates()
{
  const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/a/?format=json");
  return response.json();
}
