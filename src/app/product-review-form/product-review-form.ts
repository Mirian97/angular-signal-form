import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TextareaModule } from 'primeng/textarea';

interface ProductReview {
  productId: string;
  rating: number;
  title: string;
  comment: string;
  recommend: boolean;
  reviewerName?: string;
}

@Component({
  selector: 'app-product-review-form',
  imports: [
    ReactiveFormsModule,
    RatingModule,
    TextareaModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './product-review-form.html',
  styleUrl: './product-review-form.css',
})
export class ProductReviewForm {
  formBuilder = inject(FormBuilder);

  reviewForm = this.formBuilder.group({
    productId: ['PROD_123'],
    title: ['', Validators.required, Validators.minLength(5)],
    comment: ['', Validators.required, Validators.maxLength(500)],
    recommend: [false],
    reviewerName: [''],
    rating: [null as number | null, Validators.required, Validators.min(1)],
  });

  setRating(rating: number) {
    this.reviewForm.patchValue({ rating });
  }

  isFieldInvalid(fieldName: string) {
    const field = this.reviewForm.get(fieldName);

    return !!(field && field.invalid && (field.touched || field.dirty));
  }

  submitReview(): void {
    console.log('📤 Saving review to backend...', this.reviewForm);

    setTimeout(() => {
      console.log('✅ Review saved successfully! Thank you! 🙏');
      this.resetForm();
    }, 1000);
  }

  resetForm() {
    this.reviewForm.reset();
    this.reviewForm.patchValue({
      rating: 0,
      recommend: false,
      productId: 'PROD_123',
    });
  }
}
