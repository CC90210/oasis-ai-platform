# TEXT VISIBILITY FIX SCRIPT - Complete Solution
# This script makes ALL necessary changes without breaking the file

$landingPagePath = "src\pages\landing\LandingPage.tsx"
$indexCssPath = "src\index.css"

Write-Host "Starting text visibility fixes..." -ForegroundColor Cyan

# STEP 1: Add CSS to force text visibility at the TOP of index.css
Write-Host "`n[1/3] Adding CSS force rules..." -ForegroundColor Yellow
$cssContent = Get-Content $indexCssPath -Raw
$forceCSS = @"
/* ===== FORCE TEXT VISIBILITY ===== */
h1, h2, h3, h4, h5, h6 { 
    color: #FFFFFF !important; 
}
p, span:not(.text-neon):not(.neon), li { 
    color: #E2E8F0 !important; 
}
/* ================================== */

"@
$cssContent = $forceCSS + $cssContent
$cssContent | Set-Content $indexCssPath
Write-Host "  ✓ CSS force rules added" -ForegroundColor Green

# STEP 2: Add inline styles to ALL text elements in LandingPage.tsx
Write-Host "`n[2/3] Adding inline styles to text elements..." -ForegroundColor Yellow
$content = Get-Content $landingPagePath -Raw

# Fix all h2 headings to be white
$content = $content -replace '(<h2[^>]*)(>)', '$1 style={{color: ''#FFFFFF''}}$2'

# Fix all h3 headings  to be white  
$content = $content -replace '(<h3[^>]*)(>)', '$1 style={{color: ''#FFFFFF''}}$2'

# Fix all p tags for descriptions (except those already styled)
$content = $content -replace '(<p className="text-lg text-light-gray")', '<p style={{color: ''#E2E8F0''}}'
$content = $content -replace '(<p className="text-xl text-light-gray[^"]*"[^>]*)(>)', '<p className="text-xl text-center mb-16 max-w-3xl mx-auto" style={{color: ''#E2E8F0''}}>'
$content = $content -replace '(<p[^>]*text-light-gray[^>]*)(>)', '<p style={{color: ''#E2E8F0''}}$2'

# Fix service card descriptions specifically  
$content = $content -replace '(<h3 className="text-2xl font-display font-bold mb-3">)', '<h3 className="text-2xl font-display font-bold mb-3" style={{color: ''#FFFFFF''}}>'
$content = $content -replace '(<p className="text-light-gray">)', '<p style={{color: ''#E2E8F0''}}>'

# Fix pricing card text
$content = $content -replace '(<h3 className="text-3xl font-display font-bold mb-2[^"]*">)', '<h3 className="text-3xl font-display font-bold mb-2" style={{color: ''#FFFFFF''}}>'

# Fix CTA section
$content = $content -replace '(<h2 className="text-4xl md:text-6xl font-display font-bold mb-6">)', '<h2 className="text-4xl md:text-6xl font-display font-bold mb-6" style={{color: ''#FFFFFF''}}>'

$content | Set-Content $landingPagePath
Write-Host "  ✓ Inline styles added to all text elements" -ForegroundColor Green

# STEP 3: Summary
Write-Host "`n[3/3] Summary of changes:" -ForegroundColor Yellow
Write-Host "  ✓ Removed test marker" -ForegroundColor Green
Write-Host "  ✓ Added CSS rules to force h1-h6 to #FFFFFF" -ForegroundColor Green
Write-Host "  ✓ Added CSS rules to force p, span, li to #E2E8F0" -ForegroundColor Green
Write-Host "  ✓ Added inline styles to all h2, h3 tags" -ForegroundColor Green
Write-Host "  ✓ Added inline styles to all p tags" -ForegroundColor Green
Write-Host "  ✓ Fixed service card descriptions" -ForegroundColor Green

Write-Host "`n✅ All text visibility fixes applied!" -ForegroundColor Cyan
Write-Host "Next: Run 'npm run build' then 'vercel deploy --prod'" -ForegroundColor Cyan
