﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging.Signing;
using PWMSBackend.Data;
using PWMSBackend.DTOs.outgoing;
using PWMSBackend.DTOs.Outgoing;
using PWMSBackend.Models;



namespace PWMSBackend.Controllers
{


   

    [Route("api/[controller]")]
    [ApiController]

    
    public class ItemsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ItemsController(DataContext context, IMapper mapper)
        {
            _context = context;

            _mapper = mapper;
        }


        //// GET: api/GetBidTenderItemDetailsDTO/5
        [HttpGet("BidTenderItemDetails/{mppId}/{vendorId}")]
        public async Task<ActionResult<IEnumerable<BidTenderItemDetailsDTO>>> GetBidTenderItemDetails(string mppId,string vendorId)

        {

            List<VendorPlaceBidItem> vendorPlaceBidItems = await _context.VendorPlaceBidItems.Where(x => x.VendorId == vendorId).ToListAsync();
            
         

            List<Item> items=await _context.Items.ToListAsync();
            List<SubProcurementPlanItem> subProcumentPlanItems = await _context.SubProcurementPlanItems.ToListAsync();
            //List<SubProcurementPlan> subProurementPlans = await _context.SubProcurementPlans.ToListAsync();
                        var subProcurementPlans = await _context.SubProcurementPlans
                .Include(plan => plan.subProcurementPlanItems)
                .Where(plan => plan.MasterProcurementPlan.MppId == mppId)
                .ToListAsync();


           var mergedList = from item in items
                join subProcurementItem in subProcumentPlanItems on item.ItemId equals subProcurementItem.ItemId
                join vendorBidItem in vendorPlaceBidItems on subProcurementItem.ItemId equals vendorBidItem.ItemId
                select new {item, subProcurementItem, vendorBidItem};
         


            List<BidTenderItemDetailsDTO> bidTenderItemDetailsList = mergedList.Select(mergedItem => new BidTenderItemDetailsDTO
            {
                ItemName = mergedItem.item.ItemName,
                Specification = mergedItem.item.Specification,
                expectedDeliveryDate = mergedItem.subProcurementItem.ExpectedDeliveryDate,
                Quantity = mergedItem.subProcurementItem.Quantity,
                BidStatus = mergedItem.vendorBidItem.BidStatus,
            }).ToList();


            return Ok(bidTenderItemDetailsList);

        }



        //// GET: api/GetTenderItemDetailsDTO/5
        [HttpGet("TenderItemDetails/{mppId}/{itemId}")]
        public async Task<ActionResult<IEnumerable<TenderItemDetailsDTO>>> GetTenderItemDetails(string mppId,
            string itemId)

        {
            var subProcurementPlans = await _context.SubProcurementPlans
                .Include(plan => plan.subProcurementPlanItems)
                .Where(plan => plan.MasterProcurementPlan.MppId == mppId)
                .ToListAsync();

            var totalQuantity = subProcurementPlans
                .SelectMany(plan => plan.subProcurementPlanItems)
                .Where(item => item.ItemId == itemId)

                .Sum(item => item.Quantity);


    
            var tenderItemDetails = new TenderItemDetailsDTO
            {
                ItemName = _context.Items.Find(itemId).ItemName,
                Quantity = totalQuantity,
                Specification = _context.Items.Find(itemId).Specification,
                expectedDeliveryDate = subProcurementPlans
                    .SelectMany(plan => plan.subProcurementPlanItems)
                    .Where(item => item.ItemId == itemId)
                    .Select(item => item.ExpectedDeliveryDate)
                    .OrderBy(date => date) // Sort the dates in ascending order
                    .FirstOrDefault()
            };

            return Ok(tenderItemDetails);
            
        }


        //// GET: api/GetTenderItemDetailsDTO/5
        [HttpGet("TenderItemsDetails/{mppId}")]
        public async Task<ActionResult<TenderItemDetailsDTO>> GetTenderItemsDetails(string mppId,
            string itemId)

        {



            return Ok();

        }






        // GET: api/Items
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            return await _context.Items.ToListAsync();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(string id)
        {
          if (_context.Items == null)
          {
              return NotFound();
          }
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(string id, Item item)
        {
            if (id != item.ItemId)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
          if (_context.Items == null)
          {
              return Problem("Entity set 'DataContext.Items'  is null.");
          }
            _context.Items.Add(item);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ItemExists(item.ItemId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetItem", new { id = item.ItemId }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(string id)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(string id)
        {
            return (_context.Items?.Any(e => e.ItemId == id)).GetValueOrDefault();
        }
    }
}
