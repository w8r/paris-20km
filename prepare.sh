mkdir -p data;

echo "Downloading files"
curl https://osrm-paris.s3.eu-west-3.amazonaws.com/foot.zip --output data/foot.zip;
curl https://osrm-paris.s3.eu-west-3.amazonaws.com/bike.zip --output data/bike.zip;

echo "Done"

ls -lah data;

cd data && unzip foot.zip;
cd data && unzip bike.zip;

ls -lah data;
