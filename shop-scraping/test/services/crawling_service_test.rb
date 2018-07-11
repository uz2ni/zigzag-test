require 'test_helper'

class CrawlingServiceTest < ActiveSupport::TestCase
  setup do

  end

  test "페이지 가져오기" do
    page = CrawlingService.new
    page.get_page
  end

  test "상품 정보 하나만 가져오기" do
    page = CrawlingService.new
    page = page.get_page
    pp find_product(page)

  end
end
