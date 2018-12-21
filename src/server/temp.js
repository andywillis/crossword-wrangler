//     (link, i) => throttle(async () => {

//       const filename = link.split('/').pop().replace('xml', 'json');
//       const uri = path.join(filePath, filename);

//       if (await !pathExists(uri)) {
//         console.log('Saving')
//     //     try {

//     //       const [err, res] = await to(request(`${link}dfsdsf`));

//     //       if (err) {
//     //         console.error(err.message);
//     //       } else {
//     //         const data = await xmlParseString(res);
//     //         const xwordObj = restructureData(data);
//     //         const json = JSON.stringify(xwordObj);

//     //         await writeFile(uri, json);
//     //         log(`Saved ${i}/${uris[type].length} ${uri}`);  
//     //       }

//     //     } catch (err) {
//     //       console.error(err);
//     //     }

//       } else {
//         console.log(`Skipping: ${uri}`);
//       }

//     }));

resolve();


try {

  const [err, res] = await to(request(`${link}dfsdsf`));

  if (err) {
    console.error(err.message);
  } else {
    const data = await xmlParseString(res);
    const xwordObj = restructureData(data);
    const json = JSON.stringify(xwordObj);

    await writeFile(uri, json);
    log(`Saved ${i}/${uris[type].length} ${uri}`);
  }

} catch (err) {
  console.error(err);
}

