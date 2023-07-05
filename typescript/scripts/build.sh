rm -r output
mkdir output
ton-compiler --input ./source/TokenOracle/main.func --output ./output/ton-link-token.cell --output-fift ./output/ton-link-token.fif
echo "✓ Create ton-link-token.cell"
echo "✓ Create ton-link-token.fif"
ton-compiler --input ./source/NativeOracle/main.func --output ./output/ton-link-native.cell --output-fift ./output/ton-link-native.fif
echo "✓ Create ton-link-native.cell"
echo "✓ Create ton-link-native.fif"