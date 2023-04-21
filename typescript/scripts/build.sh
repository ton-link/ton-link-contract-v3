rm -r output
mkdir output
ton-compiler --input ./source/main.func --output ./output/ton-link.cell --output-fift ./output/ton-link.fif
echo "✓ Create ton-link.cell"
echo "✓ Create ton-link.fif"