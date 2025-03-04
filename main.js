const deviceSelect = document.querySelector(".deviceSelect");
const changeDeviceButton = document.querySelector(".changeDeviceButton");

const headers = {
  token: "8Xaga7saS2hOdo58JPh9UAiZDLZmfWZJ",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0",
  userid: "523131",
};

const getListDevice = async () => {
  try {
    const { data } = await axios.get(
      "https://api.vmoscloud.com/vcpcloud/api/userEquipment/getUpOrDownEquipmentList?equipmentId=261507",
      {
        headers,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

const renderOption = (optionsData) => {
  const html = optionsData
    .map(({ configId, configName }) => {
      return `<option value=${configId}>${configName}</option>`;
    })
    .join("");

  return html;
};

const data = getListDevice().then((res) => {
  const html = renderOption(
    res.data.upOrDownGoodsConfigVos[0].upOrDownGoodsConfigVos.filter(
      (device) => device.dayAveragePrice === "0.43"
    )
  );
  deviceSelect.innerHTML = html;
});

changeDeviceButton.addEventListener("click", () => {
  targetConfigId = Number(deviceSelect.value);
  const data = axios.post(
    "https://api.vmoscloud.com/vcpcloud/api/userEquipment/addUpOrDownTask",
    {
      equipmentId: 261507,
      targetConfigId: targetConfigId,
      holdDataFlag: false,
    },
    {
      headers,
    }
  );

  data.then((res) => {
    console.log(res);
  });
});
