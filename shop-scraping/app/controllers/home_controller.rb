require 'open-uri'
require 'json'

class HomeController < ApplicationController

  def index
    shops = [
      ['sixsixgirls', 'http://www.66girls.co.kr'],
      ['naning9', 'http://www.naning9.com'],
      ['mocobling', 'http://www.mocobling.com']
    ]
    @all = crawl(shops)
  end

  def get_page(uri)
    return Nokogiri::HTML(open(uri))
  end

  def crawl(shops)
    all = []
    shops.each do |shop|
      if shops[0] == shop
        list = []
        doc = get_page(shop[1])

        doc.css('li.item').each do |item|
          info = {}
          info[:code] = item.css('div.box a').map { |name| name['name'] }[0].to_s.split('_')[1]
          info[:url] = shop[1] + item.css('div.box a').map { |href| href['href'] }[0].to_s
          info[:img] = 'http:' + item.css('div.box a > img').map { |src| src['src'] }[0].to_s
          info[:name] = name = item.css('div.box p.name > a > span').text
          info[:price] = if item.css('div.box > strong').text.empty?
                            item.css('ul > li:nth-child(1) span:nth-child(2)').text.split('원')[0]
                          else
                            item.css('div.box > strong').text.split('원')[0]
                          end
          list << info
        end
      elsif shops[1] == shop
        list = []
        doc = get_page(shop[1])

        doc.css('div.list_cell').each do |item|
         info = {}
         info[:code] = item.css('a').map { |href| href['href'] }[0].to_s.split('no=')[1].split('&')[0]
         info[:url] = shop[1] + item.css('a').map { |href| href['href'] }[0].to_s
         info[:img] = item.css('a > img').map { |src| src['src'] }[0].to_s
         info[:name] = name = item.css('ul.item_text > li.item_name').text.split('★')[0]
         info[:price] = item.css('li.item_price p').text
         list << info
        end
      elsif shops[2] == shop
        list = []
        doc = get_page(shop[1])

        doc.css('div.itembox').each do |item|
         info = {}
          info[:code] = item.css('a').map { |href| href['href'] }[0].to_s.split('branduid=')[1].split('&')[0]
          info[:url] = item.css('div.cover_upper > div.img > a').map { |href| href['href'] }[0].to_s
          info[:img] = item.css('div.cover_upper > div.img > a > img').map { |src| src['src'] }[0].to_s
          info[:name] = name = item.css('div.info > p.name > a').text
          info[:price] = item.css('div.info > p.prc > span.prc_sell').text
          list << info
        end
      end
      all << {
        "#{shop[0]}" => list
      }
    end
    return all
  end

end
